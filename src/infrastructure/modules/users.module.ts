import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CreateUserUseCase } from "../../application/useCases/Users/CreateUserUseCase"
import { DeleteUserUseCase } from "../../application/useCases/Users/DeleteUserUseCase"
import { GetAllUserUseCase } from "../../application/useCases/Users/GetAllUserUseCase"
import { GetByIdUserUseCase } from "../../application/useCases/Users/GetByIdUserUseCase"
import { GetOneUserUseCase } from "../../application/useCases/Users/GetOneUserUseCase"
import { UpdateUserUseCase } from "../../application/useCases/Users/UpdateUserUseCase"
import { UserRepository } from "../../domain/User/UserRepository"
import { UsersController } from "../controllers/users.controller"
import { Users } from "../entities/UsersEntity"
import { TypeOrmUserRepository } from "../repositories/TypeOrmUsersRepository"

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [
    {
      provide: UserRepository,
      useClass: TypeOrmUserRepository,
    },
    CreateUserUseCase,
    GetAllUserUseCase,
    GetOneUserUseCase,
    GetByIdUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
  controllers: [UsersController],
  exports: [GetOneUserUseCase, TypeOrmModule, UserRepository, GetByIdUserUseCase],
})
export class UsersModule {}
