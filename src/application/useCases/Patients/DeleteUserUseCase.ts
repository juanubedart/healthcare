import { Inject, Injectable } from "@nestjs/common"
import { DeleteResult } from "typeorm"
import { PatientRepository } from "../../../domain/Patient/PatientRepository"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"

@Injectable()
export class DeletePatientUseCase {
  constructor(
    @Inject(PatientRepository)
    private readonly patientRepository: PatientRepository,
  ) {}

  public async execute(id: string): Promise<DeleteResult | undefined> {
    try {
      const patient: DeleteResult | undefined = await this.patientRepository.delete(id)
      if (patient?.affected === 0) {
        throw new ErrorManager({
          type: "BAD_REQUEST",
          message: "could not delete patient",
        })
      }

      return patient
    } catch (error) {
      throw ErrorManager.createSignature(error.message)
    }
  }
}
