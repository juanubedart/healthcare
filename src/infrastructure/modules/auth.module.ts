import { Global, Module } from "@nestjs/common"
import { GetOneUserUseCase } from "../../application/useCases/Users/GetOneUserUseCase"
import { AuthorizationUserUseCase } from "../../application/useCases/Auth/AuthorizationUserUseCase"
import { AuthController } from "../controllers/auth.controller"
import { UsersModule } from "./users.module"

@Global()
@Module({
  imports: [UsersModule],
  providers: [AuthorizationUserUseCase, GetOneUserUseCase],
  controllers: [AuthController],
})
export class AuthModule {}
