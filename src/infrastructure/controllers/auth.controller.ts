import { Body, Controller, Post } from "@nestjs/common"
import { AuthorizationUserUseCase } from "../../application/useCases/Auth/AuthorizationUserUseCase"
import { LoginDto } from "../dto/LoginDto"

@Controller("auth")
export class AuthController {
  constructor(private readonly authorizationUserCase: AuthorizationUserUseCase) {}
  @Post("login")
  async login(@Body() login: LoginDto) {
    const token = await this.authorizationUserCase.execute(login.email, login.password)

    return token
  }
}
