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

  @Post(":userId")
  createBlog(@Param("userId") id: string, @Body() createDto: CreateBlogDto) {
    console.log(id,createDto)
    return this.blogsService.createBlog(createDto, id);
  }

  @Get()
  getBlog() {
    return this.blogsService.getBlogs();
  }

  @Get(":id")
  getUsersBlogById(@Param("id") id: string) {
    return this.blogsService.findAllBlogsByUserID(id);
  }

  @Get("edit/:id")
  getBlogById(@Param("id",ParseIntPipe) id:number){
    return this.blogsService.getBlogById(id)
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
