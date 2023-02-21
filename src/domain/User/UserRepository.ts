import { Repository } from "../Repository"
import { User } from "./User"
export abstract class UserRepository extends Repository<User> {
  abstract findBy({ key, value }: { key: keyof any; value: any }): Promise<User>
}
