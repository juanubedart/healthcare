import { Column, Entity, ManyToOne } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { Users } from "./UsersEntity"

@Entity({ name: "parients" })
export class Parients extends BaseEntity {
  @Column("varchar", { length: 255, nullable: false })
  name: string

  @Column("varchar", { length: 255, nullable: false })
  surname: string

  @Column("date", { nullable: false })
  birthdate: Date

  @Column("float", { nullable: false })
  weight: number

  @Column("varchar", { length: 100, nullable: true })
  healthcard: string

  @ManyToOne(() => Users, (users) => users.parients)
  user: Users
}
