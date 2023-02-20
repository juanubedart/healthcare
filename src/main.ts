import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import * as morgan from "morgan"
import { CORS } from "./infrastructure/constants/cors"
import { Logger, ValidationPipe } from "@nestjs/common"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(morgan("dev"))

  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )

  const configService = app.get(ConfigService)

  app.enableCors(CORS)

  app.setGlobalPrefix("api/v1")

  await app.listen(configService.get("PORT"))
  Logger.debug(`✅ Server running on: ${await app.getUrl()}`)
}
bootstrap()
