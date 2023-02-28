import { Inject, Injectable } from "@nestjs/common"
import { UpdateResult } from "typeorm"
import { PatientRepository } from "../../../domain/Patient/PatientRepository"
import { PatientUpdateDto } from "../../../infrastructure/dto/PatientDto"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"

@Injectable()
export class UpdatePatientUseCase {
  constructor(
    @Inject(PatientRepository)
    private readonly patientRepository: PatientRepository,
  ) {}

  public async execute(id: string, body: PatientUpdateDto): Promise<UpdateResult | undefined> {
    try {
      const patient: UpdateResult | undefined = await this.patientRepository.update(id, body)
      if (patient?.affected === 0) {
        throw new ErrorManager({
          type: "BAD_REQUEST",
          message: "could not modify patient",
        })
      }
      return patient
    } catch (error) {
      throw ErrorManager.createSignature(error.message)
    }
  }
}
