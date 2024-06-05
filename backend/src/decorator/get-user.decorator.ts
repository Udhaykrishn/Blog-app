import {
  ConsoleLogger,
  createParamDecorator,
  ExecutionContext,
} from "@nestjs/common";
import { Request } from "express";
import * as session from "express-session";
import { ClerkClient } from "@clerk/clerk-sdk-node";

export const  GetUser = createParamDecorator(
   async (data: string | undefined, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
  }
);
