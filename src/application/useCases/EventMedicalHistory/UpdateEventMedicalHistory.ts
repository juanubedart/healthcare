import { Inject, Injectable, Scope } from "@nestjs/common"
import { REQUEST } from "@nestjs/core"
import { Request } from "express"
import { TranslatorService } from "nestjs-translator"
import { EventMedicalHistoryUpdateDto } from "src/infrastructure/dto/EventMedicalHistoryDto"
import { UpdateResult } from "typeorm"
import { EventMedicalHistoryRepository } from "../../../domain/EventMedicalHistory/EventMedicalHistoryRepository"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"

@Injectable({ scope: Scope.REQUEST })
export class UpdateEventMedicalHistoryUseCase {
  constructor(
    @Inject(EventMedicalHistoryRepository)
    private readonly eventMedicalHistory: EventMedicalHistoryRepository,
    private readonly translator: TranslatorService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  public async execute(id: string, body: EventMedicalHistoryUpdateDto): Promise<UpdateResult | undefined> {
    try {
      const event: UpdateResult | undefined = await this.eventMedicalHistory.update(id, body)
      if (event?.affected === 0) {
        throw new ErrorManager({
          type: "BAD_REQUEST",
          message: this.translator.translate("NOT_UPDATED_EVENT", { lang: this.request.lang }),
        })
      }
      return event
    } catch (error) {
      throw ErrorManager.createSignature(error.message)
    }
  }
}
