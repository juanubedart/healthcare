import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { UsersModule } from "./infrastructure/modules/users.module"
import { DataSourceConfig } from "./infrastructure/config/data.source"
import { ParientsModule } from "./infrastructure/modules/parients.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot(DataSourceConfig),
    UsersModule,
    ParientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
