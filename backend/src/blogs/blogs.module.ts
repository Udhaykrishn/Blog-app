import { Module } from "@nestjs/common";
import { BlogsController } from "./blogs.controller";
import { BlogsService } from "./blogs.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { BlogRepository } from "./repositorys/blog.repo";

@Module({
  imports: [PrismaModule], 
  controllers: [BlogsController],
  providers: [BlogsService, BlogRepository],
})
export class BlogsModule {}
