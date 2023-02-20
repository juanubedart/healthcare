import { InjectRepository } from "@nestjs/typeorm"
import { PatientRepository } from "../../domain/Patient/PatientRepository"
import { Parients } from "../entities/ParientEntity"
import { Repository } from "../../domain/Repository"
import { Patient } from "src/domain/Patient/Patient"
import { DeleteResult, UpdateResult } from "typeorm"

export class TypeOrmParientsRepository extends PatientRepository {
  findByUser(id: string) {
    throw new Error("Method not implemented.")
  }
  create(entity: Patient): Promise<Patient> {
    throw new Error("Method not implemented.")
  }
  update(id: string, entity: Patient): Promise<UpdateResult | undefined> {
    throw new Error("Method not implemented.")
  }
  delete(id: string): Promise<DeleteResult | undefined> {
    throw new Error("Method not implemented.")
  }
  findOne(id: string): Promise<Patient> {
    throw new Error("Method not implemented.")
  }
  findAll(): Promise<Patient[]> {
    throw new Error("Method not implemented.")
  }
  constructor(
    @InjectRepository(Parients)
    private readonly parientsRepository: Repository<Parients>,
  ) {
    super()
  }
}
