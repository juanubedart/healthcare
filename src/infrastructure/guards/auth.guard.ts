import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { Request } from "express"
import { TranslatorService } from "nestjs-translator"
import { GetByIdUserUseCase } from "../../application/useCases/Users/GetByIdUserUseCase"
import { PUBLIC_KEY } from "../constants"
import { IUseToken } from "../token/AuthInterfaces"
import { useToken } from "../token/UseToken"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly getByIdUserUseCase: GetByIdUserUseCase,
    private readonly reflector: Reflector,
    private readonly translator: TranslatorService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler())

    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest<Request>()

    const token = request.headers["x-access-token"]

    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException(this.translator.translate("INVALID_TOKEN"))
    }

    const manageToken: IUseToken | string = useToken(token)
    if (typeof manageToken === "string") {
      throw new UnauthorizedException(manageToken)
    }

    if (manageToken.isExpired) {
      throw new UnauthorizedException(this.translator.translate("TOKEN_EXPIRED"))
    }

    const { sub } = manageToken
    const user = await this.getByIdUserUseCase.execute(sub)
    if (!user) {
      throw new UnauthorizedException(this.translator.translate("INVALID_USER"))
    }

    request.idUser = sub
    request.emailUser = user.email
    request.lang = user.lang

    return true
  }
}
