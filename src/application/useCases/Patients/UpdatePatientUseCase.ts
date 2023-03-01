import { Inject, Injectable, Scope } from "@nestjs/common"
import { REQUEST } from "@nestjs/core"
import { Request } from "express"
import { TranslatorService } from "nestjs-translator"
import { UpdateResult } from "typeorm"
import { PatientRepository } from "../../../domain/Patient/PatientRepository"
import { PatientUpdateDto } from "../../../infrastructure/dto/PatientDto"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"

@Injectable({ scope: Scope.REQUEST })
export class UpdatePatientUseCase {
  constructor(
    @Inject(PatientRepository)
    private readonly patientRepository: PatientRepository,
    private readonly translator: TranslatorService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  public async execute(id: string, body: PatientUpdateDto): Promise<UpdateResult | undefined> {
    try {
      const patient: UpdateResult | undefined = await this.patientRepository.update(id, body)
      if (patient?.affected === 0) {
        throw new ErrorManager({
          type: "BAD_REQUEST",
          message: this.translator.translate("NOT_UPDATED_PATIENT", { lang: this.request.lang }),
        })
      }
      return patient
    } catch (error) {
      throw ErrorManager.createSignature(error.message)
    }
  }
}
