import { Injectable } from "@nestjs/common";
import { CreateBlogDto, UpdateBlogDto } from "./dto";
import { clerkClient } from "@clerk/clerk-sdk-node";

@Injectable()
export class BlogsService {
  createBlog(createDto: CreateBlogDto) {
    return createDto;
  }

  async getBlog() {
    return "hello world"
  }

  getBlogById(id: string) {
    return id;
  }

  updateBlog(id: string, updateDto: UpdateBlogDto) {
    return { id, updateDto };
  }

  deleteBlog(id: string) {
    return id;
  }
}
