import { Inject, Injectable, Logger, Scope } from "@nestjs/common"
import { REQUEST } from "@nestjs/core"
import { Request } from "express"
import { TranslatorService } from "nestjs-translator"
import { Patient } from "../../../domain/Patient/Patient"
import { PatientRepository } from "../../../domain/Patient/PatientRepository"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"

@Injectable({ scope: Scope.REQUEST })
export class GetAllPatientsUseCase {
  constructor(
    @Inject(PatientRepository)
    private readonly patientRepository: PatientRepository,
    private readonly translator: TranslatorService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  public async execute(): Promise<Patient[]> {
    try {
      Logger.debug("dentro")
      const patients: Patient[] = await this.patientRepository.findAll()

      if (patients.length === 0) {
        throw new ErrorManager({
          type: "BAD_REQUEST",
          message: this.translator.translate("NOT_FOUND_PATIENTS", { lang: this.request.lang }),
        })
      }

      return patients
    } catch (error) {
      throw ErrorManager.createSignature(error.message)
    }
  }
}
