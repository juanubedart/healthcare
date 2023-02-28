import { Inject, Injectable } from "@nestjs/common"
import { User } from "../../../domain/User/User"
import { UserRepository } from "../../../domain/User/UserRepository"
import { UserDto } from "../../../infrastructure/dto/UsersDto"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"
import { Crypto } from "../../../infrastructure/utils/crypto/Crypto"

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(body: UserDto): Promise<User> {
    try {
      const encryptedPassword = await new Crypto().encrypt(body.password)
      body.password = encryptedPassword

      const user = await this.userRepository.create(body)
      return user
    } catch (error) {
      throw ErrorManager.createSignature(error.message)
    }
  }
}
