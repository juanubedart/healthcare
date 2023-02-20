import { Module } from "@nestjs/common"
import { UsersController } from "../controllers/users.controller"
import { UserRepository } from "../../domain/User/UserRepository"
import { TypeOrmUserRepository } from "../repositories/TypeOrmUsersRepository"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Users } from "../entities/UsersEntity"
import { CreateUserUseCase } from "../../application/useCases/Users/CreateUserUseCase"
import { GetAllUserUseCase } from "../../application/useCases/Users/GetAllUserUseCase"
import { GetByIdUserUseCase } from "../../application/useCases/Users/GetByIdUserUseCase"

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [
    {
      provide: UserRepository,
      useClass: TypeOrmUserRepository,
    },
    CreateUserUseCase,
    GetAllUserUseCase,
    GetByIdUserUseCase,
  ],
  controllers: [UsersController],
})
export class UsersModule {}