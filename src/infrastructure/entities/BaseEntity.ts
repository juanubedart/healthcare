import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

export abstract class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date

  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt: Date
}
