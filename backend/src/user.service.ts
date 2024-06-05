// user.service.ts
import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    try {
      const user = await this.prisma.user.create({ data });
      this.logger.log(`User created: ${user.clerkId}`);
      return user;
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          this.logger.warn(`Unique constraint violation: ${error.meta?.target}`);
        }
      }
      throw error;
    }
  }

  async findUserByClerkId(clerkId: string) {
    return this.prisma.user.findUnique({ where: { clerkId } });
  }

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}