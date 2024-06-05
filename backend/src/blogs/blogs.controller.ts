import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { BlogsService } from "./blogs.service";
import { CreateBlogDto, UpdateBlogDto } from "./dto";

@Controller("blogs")
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post(":id")
  createBlog(@Param("id") id: string, @Body() createDto: CreateBlogDto) {
    console.log(id)
    return this.blogsService.createBlog(createDto, id);
  }

  @Get()
  getBlog() {
    return this.blogsService.getBlogs();
  }

  @Get(":id")
  getBlogById(@Param("id") id: string) {
    return this.blogsService.findAllBlogsByUserID(id);
  }

  @Patch(":id")
  updateBlog(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBlogDto: UpdateBlogDto
  ) {
    return this.blogsService.updateBlog(+id, updateBlogDto);
  }

  @Delete(":id")
  deleteBlog(@Param("id", ParseIntPipe) id: number) {
    return this.blogsService.deleteBlog(id);
  }
}
