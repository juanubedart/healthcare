import { Inject, Injectable, Logger } from "@nestjs/common"
import { Patient } from "../../../domain/Patient/Patient"
import { PatientRepository } from "../../../domain/Patient/PatientRepository"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"

@Injectable()
export class GetAllPatientsUseCase {
  constructor(
    @Inject(PatientRepository)
    private readonly patientRepository: PatientRepository,
  ) {}

  public async execute(): Promise<Patient[]> {
    try {
      Logger.debug("dentro")
      const patients: Patient[] = await this.patientRepository.findAll()

      if (patients.length === 0) {
        throw new ErrorManager({
          type: "BAD_REQUEST",
          message: "No patients found",
        })
      }

      return patients
    } catch (error) {
      throw ErrorManager.createSignature(error.message)
    }
  }
}
