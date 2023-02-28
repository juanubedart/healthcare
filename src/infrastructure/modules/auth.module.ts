import { Global, Module } from "@nestjs/common"
import { AuthorizationUserUseCase } from "../../application/useCases/Auth/AuthorizationUserUseCase"
import { GetOneUserUseCase } from "../../application/useCases/Users/GetOneUserUseCase"
import { AuthController } from "../controllers/auth.controller"
import { UsersModule } from "./users.module"
// import { PassportModule } from "@nestjs/passport"
// import { JwtModule } from "@nestjs/jwt"
// import { StrategyJwtUseCase } from "src/application/useCases/Auth/StrategyJwtUseCase"

@Global()
@Module({
  imports: [
    UsersModule,
    // PassportModule,
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: "1d" },
    // }),
  ],
  providers: [AuthorizationUserUseCase, GetOneUserUseCase], // StrategyJwtUseCase],
  controllers: [AuthController],
  exports: [AuthorizationUserUseCase],
})
export class AuthModule {}
