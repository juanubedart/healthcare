import { Inject, Injectable, Scope } from "@nestjs/common"
import { REQUEST } from "@nestjs/core"
import { Request } from "express"
import { TranslatorService } from "nestjs-translator"
import { DeleteResult } from "typeorm"
import { EventMedicalHistoryRepository } from "../../../domain/EventMedicalHistory/EventMedicalHistoryRepository"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"

@Injectable({ scope: Scope.REQUEST })
export class DeleteEventMedicalHistoryUseCase {
  constructor(
    @Inject(EventMedicalHistoryRepository)
    private readonly eventMedicalHistoryRepository: EventMedicalHistoryRepository,
    private readonly translator: TranslatorService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  public async execute(id: string): Promise<DeleteResult> {
    try {
      const event: DeleteResult | undefined = await this.eventMedicalHistoryRepository.delete(id)
      if (event?.affected === 0) {
        throw new ErrorManager({
          type: "BAD_REQUEST",
          message: "",
        })
      }
      return event
    } catch (error) {
      throw ErrorManager.createSignature(error.message)
    }
  }
}
