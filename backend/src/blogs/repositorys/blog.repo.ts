import { PrismaService } from "./../../prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { CreateBlogDto, UpdateBlogDto } from "../dto";
import { Blog, Prisma } from "@prisma/client";

@Injectable()
export class BlogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Omit<Prisma.BlogCreateInput, "user">,
    userId: number
  ): Promise<Blog> {
    return this.prisma.blog.create({
      data: {
        ...data,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async findAll(): Promise<Blog[]> {
    return this.prisma.blog.findMany();
  }

  async findAllBlogsByUserID(userID: number): Promise<Blog[]> {
    return this.prisma.blog.findMany({
      where: {
        user: { id: userID },
      },
      include: { user: true },
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
