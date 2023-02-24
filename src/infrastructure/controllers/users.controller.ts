import { Body, Controller, Post, Get, Param, Put, Delete, UseGuards } from "@nestjs/common"
import { UserDto, UserUpdateDto } from "../dto/UsersDto"
import { User } from "../../domain/User/User"
import { CreateUserUseCase } from "../../application/useCases/Users/CreateUserUseCase"
import { GetAllUserUseCase } from "../../application/useCases/Users/GetAllUserUseCase"
import { GetByIdUserUseCase } from "../../application/useCases/Users/GetByIdUserUseCase"
import { UpdateUserUseCase } from "../../application/useCases/Users/UpdateUserUseCase"
import { DeleteUserUseCase } from "../../application/useCases/Users/DeleteUserUseCase"
import { AuthGuard } from "@nestjs/passport"

@Controller("users")
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUserUseCase: GetAllUserUseCase,
    private readonly getByIdUserUseCase: GetByIdUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post("register")
  public async registerUser(@Body() body: UserDto) {
    const user: User = await this.createUserUseCase.execute(body)
    return user
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("all")
  public async getAllUser() {
    const users: User[] = await this.getAllUserUseCase.execute()
    return users
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("/:id")
  public async getUserById(@Param("id") id: string) {
    const user: User = await this.getByIdUserUseCase.execute(id)
    return user
  }

  @UseGuards(AuthGuard("jwt"))
  @Put("edit/:id")
  public async updateUser(@Param("id") id: string, @Body() body: UserUpdateDto) {
    const user = await this.updateUserUseCase.execute(id, body)
    return user
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("delete/:id")
  public async deleteUser(@Param("id") id: string) {
    const user = await this.deleteUserUseCase.execute(id)
    return user
  }
}
