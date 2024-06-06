import { Injectable } from "@nestjs/common";
import { CreateBlogDto, UpdateBlogDto } from "./dto";  
import { BlogRepository } from "./repositorys/blog.repo";

@Injectable()
export class BlogsService {
  constructor(private readonly blogRepository: BlogRepository) {}

  async createBlog(createDto: CreateBlogDto, id: string) {
    return  this.blogRepository.create(createDto, id);
  }

  async getBlogs() {
    return this.blogRepository.findAll();
  }

  async findAllBlogsByUserID(id: string) {
    return this.blogRepository.findAllBlogsByUserID(id);
  }

  async updateBlog(id: number, updateDto: UpdateBlogDto) {
    return this.blogRepository.update(id, updateDto);
  }

  async deleteBlog(id: number) {
    return this.blogRepository.delete(id);
  }
}
