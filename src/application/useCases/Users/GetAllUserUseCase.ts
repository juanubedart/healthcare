import { Inject, Injectable, Scope } from "@nestjs/common"
import { REQUEST } from "@nestjs/core"
import { Request } from "express"
import { TranslatorService } from "nestjs-translator"
import { User } from "../../../domain/User/User"
import { UserRepository } from "../../../domain/User/UserRepository"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"

@Injectable({ scope: Scope.REQUEST })
export class GetAllUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly translator: TranslatorService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  public async execute(): Promise<User[]> {
    try {
      const users: User[] = await this.userRepository.findAll()

      if (users.length === 0) {
        throw new ErrorManager({
          type: "BAD_REQUEST",
          message: this.translator.translate("NOT_FOUND_USERS", { lang: this.request.lang }),
        })
      }

      return users
    } catch (error) {
      throw ErrorManager.createSignature(error.message)
    }
  }
}
