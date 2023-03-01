import { Inject, Injectable, Scope } from "@nestjs/common"
import { REQUEST } from "@nestjs/core"
import { Request } from "express"
import { TranslatorService } from "nestjs-translator"
import { Patient } from "../../../domain/Patient/Patient"
import { PatientRepository } from "../../../domain/Patient/PatientRepository"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"

@Injectable({ scope: Scope.REQUEST })
export class GetByIdPatientUseCase {
  constructor(
    @Inject(PatientRepository)
    private readonly patientRepository: PatientRepository,
    private readonly translator: TranslatorService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  public async execute(id: string): Promise<Patient> {
    try {
      const patient: Patient = await this.patientRepository.findOne(id)
      if (!patient) {
        throw new ErrorManager({
          type: "BAD_REQUEST",
          message: this.translator.translate("NOT_FOUND_PATIENT", { lang: this.request.lang }),
        })
      }
      return patient
    } catch (error) {
      throw ErrorManager.createSignature(error.message)
    }
  }
}
