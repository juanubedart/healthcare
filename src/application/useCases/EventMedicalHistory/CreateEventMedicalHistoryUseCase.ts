import { Inject, Injectable } from "@nestjs/common"
import { EventMedicalHistory } from "../../../domain/EventMedicalHistory/EventMedicalHistory"
import { EventMedicalHistoryRepository } from "../../../domain/EventMedicalHistory/EventMedicalHistoryRepository"
import { EventMedicalHistoryDto } from "../../../infrastructure/dto/EventMedicalHistoryDto"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"

@Injectable()
export class CreateEventMedicalHistoryUseCase {
  constructor(
    @Inject(EventMedicalHistoryRepository)
    private readonly eventMedicalHistoryRepository: EventMedicalHistoryRepository,
  ) {}

  public async execute(body: EventMedicalHistoryDto): Promise<EventMedicalHistory> {
    try {
      const eventMedicalHistory = await this.eventMedicalHistoryRepository.create(body)
      return eventMedicalHistory
    } catch (error) {
      throw ErrorManager.createSignature(error.message)
    }
  }
}
