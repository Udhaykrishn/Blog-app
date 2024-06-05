import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Req,
} from "@nestjs/common";
import { BlogsService } from "./blogs.service";
import { CreateBlogDto, UpdateBlogDto } from "./dto";
import { GetUser } from "src/decorator/get-user.decorator";
import { Request } from "express";
import * as session from "express-session"

@Controller("blogs")
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {} 

  @Post()
  createBlog(@Body() createDto: CreateBlogDto) {
    return this.blogsService.createBlog(createDto);
  }

  @Get()
  getBlog(@Req() req: Request,){
    return this.blogsService.getBlog();
  }

  @Get(":id")
  getBlogById(@Param("id") id: string) {
    return this.blogsService.getBlogById(id);
  }

  @Patch(":id")
  updateBlog(@Param("id") id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.updateBlog(id, updateBlogDto);
  }

  @Delete(":id")
  deleteBlog(@Param("id") id: string) {
    return this.blogsService.deleteBlog(id);
  }
}
