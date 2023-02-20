import { Inject, Injectable } from "@nestjs/common"
import { User } from "../../../domain/User/User"
import { UserDto } from "../../../infrastructure/dto/UsersDto"
import { UserRepository } from "../../../domain/User/UserRepository"

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(body: UserDto): Promise<User> {
    try {
      const user = await this.userRepository.create(body)
      return user
    } catch (error) {
      throw new Error(error)
    }
  }
}
