import { Inject, Injectable } from "@nestjs/common"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"
import { UpdateResult } from "typeorm"
import { UserRepository } from "../../../domain/User/UserRepository"
import { UserUpdateDto } from "../../../infrastructure/dto/UsersDto"

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(id: string, body: UserUpdateDto): Promise<UpdateResult | undefined> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body)
      if (user.affected === 0) {
        throw new ErrorManager({
          type: "BAD_REQUEST",
          message: "could not modify user",
        })
      }
      return user
    } catch (error) {
      throw new ErrorManager.createSignature(error.message)
    }
  }
}
