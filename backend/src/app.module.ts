import { Module, MiddlewareConsumer, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { AppController } from "./app.controller";
import { BlogsModule } from "./blogs/blogs.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    PrismaModule,
    UserModule,
    BlogsModule,
  ],
  controllers: [AppController],
})
export class AppModule {
}
