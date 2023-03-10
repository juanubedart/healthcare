import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common"

import { CreateUserUseCase } from "../../application/useCases/Users/CreateUserUseCase"
import { DeleteUserUseCase } from "../../application/useCases/Users/DeleteUserUseCase"
import { GetAllUserUseCase } from "../../application/useCases/Users/GetAllUserUseCase"
import { GetByIdUserUseCase } from "../../application/useCases/Users/GetByIdUserUseCase"
import { UpdateUserUseCase } from "../../application/useCases/Users/UpdateUserUseCase"
import { User } from "../../domain/User/User"
import { PublicAccess } from "../decorators/PublicDecorator"
import { UserDto, UserUpdateDto } from "../dto/UsersDto"
import { AuthGuard } from "../guards/auth.guard"

@Controller("users")
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUserUseCase: GetAllUserUseCase,
    private readonly getByIdUserUseCase: GetByIdUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @PublicAccess()
  @Post("register")
  public async registerUser(@Body() body: UserDto) {
    const user: User = await this.createUserUseCase.execute(body)
    return user
  }

  @Get("all")
  public async getAllUser() {
    const users: User[] = await this.getAllUserUseCase.execute()
    return users
  }

  @Get("/:id")
  public async getUserById(@Param("id") id: string) {
    const user: User = await this.getByIdUserUseCase.execute(id)
    return user
  }

  @Put("edit/:id")
  public async updateUser(@Param("id") id: string, @Body() body: UserUpdateDto) {
    const user = await this.updateUserUseCase.execute(id, body)
    return user
  }

  @Delete("delete/:id")
  public async deleteUser(@Param("id") id: string) {
    const user = await this.deleteUserUseCase.execute(id)
    return user
  }
}
