import { InjectRepository } from "@nestjs/typeorm"
import { DeleteResult, Repository, UpdateResult } from "typeorm"
import { User } from "../../domain/User/User"
import { UserRepository } from "../../domain/User/UserRepository"
import { Users } from "../entities/UsersEntity"

export class TypeOrmUserRepository extends UserRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {
    super()
  }
  public async findBy({ key, value }: { key: keyof any; value: any }): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .where({ [key]: value })
      .getOne()

    return user
  }

  public async create(entity: User): Promise<User> {
    const newUser = await this.userRepository.save(entity)
    return newUser
  }
  public async update(id: string, entity: User): Promise<UpdateResult | undefined> {
    const updatedUser: UpdateResult = await this.userRepository.update(id, entity)
    return updatedUser
  }
  public async delete(id: string): Promise<DeleteResult | undefined> {
    const deletedUser: DeleteResult = await this.userRepository.delete(id)
    return deletedUser
  }
  public async findOne(id: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .where({ id })
      .leftJoinAndSelect("user.patients", "patients")
      .getOne()

    return user
  }
  public async findAll(): Promise<User[]> {
    const users = await this.userRepository.find()
    return users
  }
}
