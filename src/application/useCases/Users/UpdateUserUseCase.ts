import { Inject, Injectable, Scope } from "@nestjs/common"
import { REQUEST } from "@nestjs/core"
import { Request } from "express"
import { TranslatorService } from "nestjs-translator"
import { UpdateResult } from "typeorm"
import { UserRepository } from "../../../domain/User/UserRepository"
import { UserUpdateDto } from "../../../infrastructure/dto/UsersDto"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"

@Injectable({ scope: Scope.REQUEST })
export class UpdateUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly translator: TranslatorService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  public async execute(id: string, body: UserUpdateDto): Promise<UpdateResult | undefined> {
    try {
      const user: UpdateResult | undefined = await this.userRepository.update(id, body)

      if (user?.affected === 0) {
        throw new ErrorManager({
          type: "BAD_REQUEST",
          message: this.translator.translate("NOT_UPDATED_USER", { lang: this.request.lang }),
        })
      }
      return user
    } catch (error) {
      throw ErrorManager.createSignature(error.message)
    }
  }
}
