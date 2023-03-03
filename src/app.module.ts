import { HttpException, MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { APP_INTERCEPTOR } from "@nestjs/core"
import { TypeOrmModule } from "@nestjs/typeorm"
import { SentryInterceptor, SentryModule } from "@ntegral/nestjs-sentry"

import { TranslatorModule } from "nestjs-translator"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { DataSourceConfig } from "./infrastructure/config/data.source"
import { AuthModule } from "./infrastructure/modules/auth.module"
import { EventMedicalHistoryModule } from "./infrastructure/modules/eventMedicalHistory.module"
import { PatientsModule } from "./infrastructure/modules/patients.module"
import { UsersModule } from "./infrastructure/modules/users.module"
import { SentryMiddleware } from "./infrastructure/sentry/sentry.middleware"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot(DataSourceConfig),
    TranslatorModule.forRoot({
      global: true,
      defaultLang: "es",
      translationSource: "/src/i18n",
    }),
    UsersModule,
    PatientsModule,
    AuthModule,
    SentryModule.forRootAsync({
      useFactory: () => ({
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV,
        enabled: process.env.SENTRY_ENABLED,
      }),
    }),
    EventMedicalHistoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useValue: new SentryInterceptor({
        filters: [
          {
            type: HttpException,
            filter: (exception: HttpException) => {
              return 500 > exception.getStatus()
            },
          },
        ],
      }),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SentryMiddleware).forRoutes("*")
  }
}
