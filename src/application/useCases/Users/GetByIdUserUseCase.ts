import { Inject, Injectable, Logger } from "@nestjs/common"
import { ErrorManager } from "src/infrastructure/errorHandler/ErrorManager"
import { User } from "../../../domain/User/User"
import { UserRepository } from "../../../domain/User/UserRepository"

@Injectable()
export class GetByIdUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(id: string): Promise<User> {
    try {
      Logger.debug(id)
      const user: User = await this.userRepository.findOne(id)
      if (!user) {
        throw new ErrorManager({
          type: "BAD_REQUEST",
          message: "no user found",
        })
      }

      return user
    } catch (error) {
      throw new ErrorManager(error.message)
    }
  }
}
