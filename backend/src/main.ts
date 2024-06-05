import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as session from "express-session";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
  );
  app.use(
    session({
      secret: "my-secret",
      resave: false,
      saveUninitialized: false,
      cookie:{secure:false}
    })
  );
  await app.listen(3000);
}
bootstrap();
