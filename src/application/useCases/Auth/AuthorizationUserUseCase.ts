import { Injectable } from "@nestjs/common"
import { GetOneUserUseCase } from "../Users/GetOneUserUseCase"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"
import { Crypto } from "../../../infrastructure/utils/crypto/Crypto"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthorizationUserUseCase {
  constructor(private readonly getOneUserUseCase: GetOneUserUseCase, private readonly jwtService: JwtService) {}

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
          message: "Invalid credentials",
        })
      }

      const match = await new Crypto().compare(password, user.password)

      if (!match) {
        throw new ErrorManager({
          type: "UNAUTHORIZED",
          message: "Invalid credentials",
        })
      }

      return user
    } catch (error) {
      throw ErrorManager.createSignature(error.message)
    }
  }

  private async SignJWT(payload: any): Promise<string> {
    return await this.jwtService.sign(payload)
  }

  private async generateJWT(user: any): Promise<any> {
    const payload = { email: user.email }

    const token = await this.SignJWT(payload)

    return {
      access_token: token,
    }
  }
}
