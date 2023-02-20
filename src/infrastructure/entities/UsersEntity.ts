import { Column, Entity, OneToMany } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { Parients } from "./ParientEntity"

@Entity({ name: "users" })
export class Users extends BaseEntity {
  @Column("varchar", { length: 255, nullable: false })
  name: string

  @Column("varchar", { length: 255, nullable: false })
  surname: string

  @Column("varchar", { length: 255, nullable: false, unique: true })
  email: string

  @Column("varchar", { length: 255, nullable: false })
  password: string

  @OneToMany(() => Parients, (parients) => parients.user)
  parients: Parients[]
}
