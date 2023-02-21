import { Injectable } from "@nestjs/common"
import { GetOneUserUseCase } from "../Users/GetOneUserUseCase"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"
import { Crypto } from "../../../infrastructure/utils/crypto/Crypto"
import * as jwt from "jsonwebtoken"

@Injectable()
export class AuthorizationUserUseCase {
  constructor(private readonly getOneUserUseCase: GetOneUserUseCase) {}

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
          type: "FORBIDDEN",
          message: "Invalid credentials",
        })
      }

      const match = await new Crypto().compare(password, user.password)

      if (!match) {
        throw new ErrorManager({
          type: "FORBIDDEN",
          message: "Invalid credentials",
        })
      }

      return user
    } catch (error) {
      throw ErrorManager.createSignature(error.message)
    }
  }

  private async SignJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JWTPayload
    secret: string
    expires: number | string
  }): Promise<string> {
    return await jwt.sign(payload, secret, { expiresIn: expires })
  }

  private async generateJWT(user: any): Promise<any> {
    const payload = { id: user.id }
    const secret = process.env.JWT_SECRET
    const expires = "1d"

    const token = await this.SignJWT({ payload, secret, expires })

    return {
      accessToken: token,
      user,
    }
  }
}
