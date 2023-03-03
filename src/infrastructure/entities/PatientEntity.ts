import { Column, Entity, ManyToOne, OneToMany } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { EventsMedicalHistory } from "./EventMedicalHistory"
import { Users } from "./UsersEntity"

@Entity({ name: "patients" })
export class Patients extends BaseEntity {
  @Column("varchar", { length: 255, nullable: false })
  name: string

  @Column("varchar", { length: 255, nullable: false })
  surname: string

  @Column("date", { nullable: false })
  birthdate: Date

  @Column("float", { nullable: false })
  weight: number

  @ManyToOne(() => Users, (users) => users.patients)
  user: Users

  @OneToMany(() => EventsMedicalHistory, (eventsMedicalHistory) => eventsMedicalHistory.patient)
  eventsMedicalHistory: EventsMedicalHistory[]
}
