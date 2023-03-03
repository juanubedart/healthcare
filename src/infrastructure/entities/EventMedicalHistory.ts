import { Column, Entity, ManyToOne } from "typeorm"
import { BaseEntity } from "./BaseEntity"
import { Patients } from "./PatientEntity"

@Entity({ name: "eventsMedicalHistory" })
export class EventsMedicalHistory extends BaseEntity {
  @Column("timestamp", { nullable: false, name: "initialDate" })
  initialDate: Date

  @Column("timestamp", { nullable: true, name: "endDate" })
  endDate: Date

  @Column("varchar", { length: 255, nullable: false })
  description: string

  @Column("bool", { default: false, name: "saveToCalendar" })
  saveToCalendar: boolean

  @ManyToOne(() => Patients, (patients) => patients.eventsMedicalHistory)
  patient: Patients
}
