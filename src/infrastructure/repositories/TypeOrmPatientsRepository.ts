import { InjectRepository } from "@nestjs/typeorm"
import { DeleteResult, Repository, UpdateResult } from "typeorm"
import { Patient } from "../../domain/Patient/Patient"
import { PatientRepository } from "../../domain/Patient/PatientRepository"
import { Patients } from "../entities/PatientEntity"

export class TypeOrmPatientsRepository extends PatientRepository {
  constructor(
    @InjectRepository(Patients)
    private readonly patientsRepository: Repository<Patients>,
  ) {
    super()
  }

  public async create(entity: Patient): Promise<Patient> {
    const newPatient = await this.patientsRepository.save(entity)
    return newPatient
  }
  public async update(id: string, entity: Patient): Promise<UpdateResult | undefined> {
    const updatedPatient: UpdateResult = await this.patientsRepository.update(id, entity)
    return updatedPatient
  }
  public async delete(id: string): Promise<DeleteResult | undefined> {
    const deletedUser: DeleteResult = await this.patientsRepository.delete(id)
    return deletedUser
  }
  public async findOne(id: string): Promise<Patient> {
    const patient = await this.patientsRepository
      .createQueryBuilder("patients")
      .where({ id })
      .leftJoinAndSelect("patients.eventsMedicalHistory", "eventsMedicalHistory")
      .getOne()

    return patient
  }
  public async findAll(): Promise<Patient[]> {
    const patients = await this.patientsRepository.find()
    return patients
  }
}
