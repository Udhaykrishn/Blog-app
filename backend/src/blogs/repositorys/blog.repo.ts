import { PrismaService } from "./../../prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Blog, Prisma, User } from "@prisma/client";

@Injectable()
export class BlogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Omit<Prisma.BlogCreateInput, "user">,
    userId: string
  ): Promise<Blog> {
    return this.prisma.blog.create({
      data: {
        ...data,
        user: {
          connect: { userId: userId },
        },
      },
    });
  }

  async findAll(): Promise<Blog[]> {
    return this.prisma.blog.findMany({
      include: { user: true },
    });
  }

  async findAllBlogsByUserID(userID: string): Promise<Blog[]> {
    return this.prisma.blog.findMany({
      where: {
        user: { userId: userID },
      },
    });
  }

  async update(
    userId: number,
    updateData: Prisma.BlogUpdateInput
  ): Promise<Blog> {
    return this.prisma.blog.update({
      where: { id: userId },
      data: updateData,
    });
  }

  async delete(Blogid: number): Promise<Blog> {
    return this.prisma.blog.delete({
      where: { id: Blogid },
    });
  }
}
