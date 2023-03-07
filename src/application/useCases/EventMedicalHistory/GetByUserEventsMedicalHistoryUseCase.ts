import { Inject, Injectable, Scope } from "@nestjs/common"
import { REQUEST } from "@nestjs/core"
import { Request } from "express"
import { TranslatorService } from "nestjs-translator"
import { EventMedicalHistory } from "../../../domain/EventMedicalHistory/EventMedicalHistory"
import { EventMedicalHistoryRepository } from "../../../domain/EventMedicalHistory/EventMedicalHistoryRepository"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"

@Injectable({ scope: Scope.REQUEST })
export class GetByUserEventsMedicalHistoryUseCase {
  constructor(
    @Inject(EventMedicalHistoryRepository)
    private readonly eventMedicalHistoryRepository: EventMedicalHistoryRepository,
    private readonly translator: TranslatorService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  public async execute(userId: string): Promise<EventMedicalHistory[]> {
    try {
      const events: EventMedicalHistory[] = await this.eventMedicalHistoryRepository.findAllbyUser(userId)
      if (!events || events.length === 0) {
        throw new ErrorManager({
          type: "NO_CONTENT",
          message: this.translator.translate("THE_USER_HAVENT_EVENT", { lang: this.request.lang }),
        })
      }
      return events
    } catch (error) {
      throw ErrorManager.createSignature(error.message)
    }
  }
}
