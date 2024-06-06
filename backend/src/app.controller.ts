import {
  Controller,
  Post,
  Req,
  Res,
  BadRequestException,
  Logger,
} from "@nestjs/common";
import { Request, Response } from "express";
import { Webhook } from "svix";
import { UserService } from "./user/user.service";
import { ConfigService } from "@nestjs/config";
import { ClerkUserCreatedEvent, ClerkWebhookEvent } from "./types";

@Controller("api/webhooks")
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(
    private readonly userService: UserService,
    private readonly config: ConfigService
  ) {}

  @Post()
  async webhook(@Req() req: Request, @Res() response: Response) {
    const secret = this.config.get<string>("WEBHOOK_SECRET");
    const payload = JSON.stringify(req.body);
    const headers = req.headers;

    const wh = new Webhook(secret);

    const svixId = headers["svix-id"] as string | undefined;
    const svixTimestamp = headers["svix-timestamp"] as string | undefined;
    const svixSignature = headers["svix-signature"] as string | undefined;

    if (!svixId || !svixTimestamp || !svixSignature) {
      throw new BadRequestException("Missing Svix headers");
    }

    try {
      const evt = wh.verify(payload, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      }) as ClerkWebhookEvent;

      this.logger.log(`Received Clerk event: ${evt.type}`);

      if (evt.type === "user.created") {
        const userData = evt.data as ClerkUserCreatedEvent;

        if (
          !userData.email_addresses ||
          userData.email_addresses.length === 0
        ) {
          throw new BadRequestException("No email address provided");
        }

        const email = userData.email_addresses[0].email_address;
        const existingUser = await this.userService.findUserByEmail(email);
        if (existingUser) {
          this.logger.warn(
            `User with email ${email} already exists, skipping creation.`
          );
          response
            .status(200)
            .json({ success: true, message: "User already exists" });
          return;
        }

        await this.userService.createUser({
          clerkId: userData.id,
          userId: userData.id,
          firstName: userData.first_name || null,
          lastName: userData.last_name || null,
          email: email,
        });

        this.logger.log(`User created: ${userData.id} - ${email}`);
        response
          .status(201)
          .json({ success: true, message: "User created successfully" });
        return;
      }

      response.status(200).json({ success: true, message: "Event processed" });
    } catch (err) {
      this.logger.error(`Error processing webhook: ${err.message}`, err.stack);
    }
  }
}
