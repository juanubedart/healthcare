import { Inject, Injectable, Scope } from "@nestjs/common"
import { REQUEST } from "@nestjs/core"
import { Request } from "express"
import { TranslatorService } from "nestjs-translator"
import { DeleteResult } from "typeorm"
import { UserRepository } from "../../../domain/User/UserRepository"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"

@Injectable({ scope: Scope.REQUEST })
export class DeleteUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly translator: TranslatorService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  public async execute(id: string): Promise<DeleteResult | undefined> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id)
      if (user.affected === 0) {
        throw new ErrorManager({
          type: "BAD_REQUEST",
          message: this.translator.translate("NOT_DELETE_USER", { lang: this.request.lang }),
        })
      }

      return user
    } catch (error) {
      throw ErrorManager.createSignature(error.message)
    }
  }
}
