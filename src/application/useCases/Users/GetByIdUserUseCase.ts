import { Inject, Injectable, Scope } from "@nestjs/common"
import { REQUEST } from "@nestjs/core"
import { Request } from "express"
import { TranslatorService } from "nestjs-translator"
import { ErrorManager } from "src/infrastructure/errorHandler/ErrorManager"
import { User } from "../../../domain/User/User"
import { UserRepository } from "../../../domain/User/UserRepository"

@Injectable({ scope: Scope.REQUEST })
export class GetByIdUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly translator: TranslatorService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  public async execute(id: string): Promise<User> {
    try {
      const user: User = await this.userRepository.findOne(id)
      if (!user) {
        throw new ErrorManager({
          type: "BAD_REQUEST",
          message: this.translator.translate("NOT_FOUND_USER", { lang: this.request.lang }),
        })
      }

      return user
    } catch (error) {
      throw ErrorManager.createSignature(error.message)
    }
  }
}
