import { Prisma } from "@prisma/client";
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status: number;
    let message: string;

    if (error instanceof HttpException) {
      status = error.getStatus();
      message = "Page not found";
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      status = HttpStatus.BAD_REQUEST; 
      message = "Bad request found";
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = "Internal server error";
    }

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
