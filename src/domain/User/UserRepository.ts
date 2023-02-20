import { Repository } from "../Repository"
import { User } from "./User"
export abstract class UserRepository extends Repository<User> {
  abstract findByEmail(email: string): Promise<User>
}
