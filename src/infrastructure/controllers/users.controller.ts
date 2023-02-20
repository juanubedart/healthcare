import { Body, Controller, Post, Get, Param } from "@nestjs/common"
import { UserDto } from "../dto/UsersDto"
import { User } from "../../domain/User/User"
import { CreateUserUseCase } from "../../application/useCases/Users/CreateUserUseCase"
import { GetAllUserUseCase } from "../../application/useCases/Users/GetAllUserUseCase"
import { GetByIdUserUseCase } from "../../application/useCases/Users/GetByIdUserUseCase"

@Controller("users")
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUserUseCase: GetAllUserUseCase,
    private readonly getByIdUserUseCase: GetByIdUserUseCase,
  ) {}

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
}
