import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma";
import { User } from "@prisma/client";
import { Prisma } from "@prisma/client";

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User> {
    return await this.prisma.user.findFirst({
      where: { userId: id },
    });
  }
}
