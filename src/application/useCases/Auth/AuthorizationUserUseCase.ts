import { Injectable } from "@nestjs/common"
import * as jwt from "jsonwebtoken"
import { TranslatorService } from "nestjs-translator"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"
import { Crypto } from "../../../infrastructure/utils/crypto/Crypto"
import { GetOneUserUseCase } from "../Users/GetOneUserUseCase"

@Injectable()
export class AuthorizationUserUseCase {
  constructor(private readonly getOneUserUseCase: GetOneUserUseCase, private readonly translator: TranslatorService) {}

  public async execute(email: string, password: string) {
    try {
      const user: any = await this.validateUser(email, password)
      const token = await this.generateJWT(user)
      return token
    } catch (error) {
      throw ErrorManager.createSignature(error.message)
    }
  }

  private async validateUser(email: string, password: string) {
    try {
      const user = await this.getOneUserUseCase.execute({ key: "email", value: email })

      if (!user) {
        throw new ErrorManager({
          type: "UNAUTHORIZED",
          message: this.translator.translate("INVALID_CREDENTIALS"),
        })
      }

      const match = await new Crypto().compare(password, user.password)

      if (!match) {
        throw new ErrorManager({
          type: "UNAUTHORIZED",
          message: this.translator.translate("INVALID_CREDENTIALS"),
        })
      }

      return user
    } catch (error) {
      throw ErrorManager.createSignature(error.message)
    }
  }

  private async SignJWT(payload: any, secret: string, expires: number | string): Promise<string> {
    return await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expires })
  }

  private async generateJWT(user: any): Promise<any> {
    const payload = { email: user.email, sub: user.id }

    const token = await this.SignJWT(payload, process.env.JWT_SECRET, "1d")

    return {
      access_token: token,
      user,
    }
  }
}
