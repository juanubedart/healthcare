import { Inject, Injectable } from "@nestjs/common"
import { UserRepository } from "../../../domain/User/UserRepository"
import { UserDto } from "../../../infrastructure/dto/UsersDto"
import { User } from "../../../domain/User/User"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"

@Injectable()
export class GetOneUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  public async execute({ key, value }: { key: keyof UserDto; value: any }): Promise<User | undefined> {
    try {
      const user: User = await this.userRepository.findBy({ key, value })
      if (!user) {
        return undefined
      }
      return user
    } catch (error) {
      throw ErrorManager.createSignature(error.message)
    }
  }
}
