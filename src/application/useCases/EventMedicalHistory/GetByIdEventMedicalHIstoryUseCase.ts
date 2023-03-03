import { Inject, Injectable, Scope } from "@nestjs/common"
import { REQUEST } from "@nestjs/core"
import { Request } from "express"
import { TranslatorService } from "nestjs-translator"
import { EventMedicalHistory } from "../../../domain/EventMedicalHistory/EventMedicalHistory"
import { EventMedicalHistoryRepository } from "../../../domain/EventMedicalHistory/EventMedicalHistoryRepository"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"

@Injectable({ scope: Scope.REQUEST })
export class GetByIdEventMedicalHistoryUseCase {
  constructor(
    @Inject(EventMedicalHistoryRepository)
    private readonly eventMedicalHistoryRepository: EventMedicalHistoryRepository,
    private readonly translator: TranslatorService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  public async execute(id: string): Promise<EventMedicalHistory> {
    try {
      const event: EventMedicalHistory = await this.eventMedicalHistoryRepository.findOne(id)
      if (!event) {
        throw new ErrorManager({
          type: "BAD_REQUEST",
          message: this.translator.translate("NOT_FOUND_EVENT", { lang: this.request.lang }),
        })
      }

      return event
    } catch (error) {
      throw ErrorManager.createSignature(error.message)
    }
  }
}
