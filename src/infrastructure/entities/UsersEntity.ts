import { Exclude } from "class-transformer"
import { Column, Entity, OneToMany } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { Patients } from "./PatientEntity"

@Entity({ name: "users" })
export class Users extends BaseEntity {
  @Column("varchar", { length: 255, nullable: false })
  name: string

  @Column("varchar", { length: 255, nullable: false })
  surname: string

  @Column("varchar", { length: 255, nullable: false, unique: true })
  email: string

  @Exclude()
  @Column("varchar", { length: 255, nullable: false })
  password: string

  @OneToMany(() => Patients, (patients) => patients.user)
  patients: Patients[]
}
