import { Inject, Injectable } from "@nestjs/common"
import { PatientRepository } from "../../../domain/Patient/PatientRepository"
import { PatientDto } from "../../../infrastructure/dto/PatientDto"
import { Patient } from "../../../domain/Patient/Patient"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"

@Injectable()
export class CreatePatientUseCase {
  constructor(
    @Inject(PatientRepository)
    private readonly patientRepository: PatientRepository,
  ) {}

  public async execute(body: PatientDto): Promise<Patient> {
    try {
      const patient = await this.patientRepository.create(body)
      return patient
    } catch (error) {
      throw ErrorManager.createSignature(error.message)
    }
  }
}
