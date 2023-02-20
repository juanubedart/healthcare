import { Inject, Injectable } from "@nestjs/common"
import { DeleteResult } from "typeorm"
import { UserRepository } from "../../../domain/User/UserRepository"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(id: string): Promise<DeleteResult | undefined> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id)
      if (user.affected === 0) {
        throw new ErrorManager({
          type: "BAD_REQUEST",
          message: "could not delete user",
        })
      }

      return user
    } catch (error) {
      throw new ErrorManager.createSignature(error.message)
    }
  }
}
