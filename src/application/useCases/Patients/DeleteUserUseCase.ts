import { Inject, Injectable, Scope } from "@nestjs/common"
import { REQUEST } from "@nestjs/core"
import { TranslatorService } from "nestjs-translator"
import { DeleteResult } from "typeorm"
import { PatientRepository } from "../../../domain/Patient/PatientRepository"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"

import { Request } from "express"

@Injectable({ scope: Scope.REQUEST })
export class DeletePatientUseCase {
  constructor(
    @Inject(PatientRepository)
    private readonly patientRepository: PatientRepository,
    private readonly translator: TranslatorService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  public async execute(id: string): Promise<DeleteResult | undefined> {
    try {
      const patient: DeleteResult | undefined = await this.patientRepository.delete(id)
      if (patient?.affected === 0) {
        throw new ErrorManager({
          type: "BAD_REQUEST",
          message: this.translator.translate("NOT_DELETE_PATIENT", { lang: this.request.lang }),
        })
      }

      return patient
    } catch (error) {
      throw ErrorManager.createSignature(error.message)
    }
  }
}
