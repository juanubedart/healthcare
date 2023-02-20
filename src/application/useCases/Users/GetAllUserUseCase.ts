import { Inject, Injectable } from "@nestjs/common"
import { UserRepository } from "../../../domain/User/UserRepository"
import { User } from "../../../domain/User/User"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"

@Injectable()
export class GetAllUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(): Promise<User[]> {
    try {
      const users: User[] = await this.userRepository.findAll()

      if (users.length === 0) {
        throw new ErrorManager({
          type: "BAD_REQUEST",
          message: "No users found",
        })
      }

      return users
    } catch (error) {
      throw new ErrorManager.createSignature(error.message)
    }
  }
}
