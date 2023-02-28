import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { Request } from "express"
import { GetByIdUserUseCase } from "../../application/useCases/Users/GetByIdUserUseCase"
import { PUBLIC_KEY } from "../constants"
import { IUseToken } from "../token/AuthInterfaces"
import { useToken } from "../token/UseToken"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly getByIdUserUseCase: GetByIdUserUseCase, private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler())

    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest<Request>()

    const token = request.headers["x-access-token"]
    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException("Invalid token")
    }

    const manageToken: IUseToken | string = useToken(token)
    if (typeof manageToken === "string") {
      throw new UnauthorizedException(manageToken)
    }

    if (manageToken.isExpired) {
      throw new UnauthorizedException("Token expired")
    }

    const { sub } = manageToken
    const user = await this.getByIdUserUseCase.execute(sub)
    if (!user) {
      throw new UnauthorizedException("Invalid user")
    }

    request.idUser = sub
    request.emailUser = user.email

    return true
  }
}
