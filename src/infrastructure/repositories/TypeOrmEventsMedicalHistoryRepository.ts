import { InjectRepository } from "@nestjs/typeorm"
import { DeleteResult, Repository, UpdateResult } from "typeorm"
import { EventMedicalHistory } from "../../domain/EventMedicalHistory/EventMedicalHistory"
import { EventMedicalHistoryRepository } from "../../domain/EventMedicalHistory/EventMedicalHistoryRepository"
import { EventsMedicalHistory } from "../entities/EventMedicalHistory"

export class TypeOrmEventsMedicalHistoryRepository extends EventMedicalHistoryRepository {
  constructor(
    @InjectRepository(EventsMedicalHistory)
    private readonly eventMedicalHistoryRepository: Repository<EventMedicalHistory>,
  ) {
    super()
  }
  public async create(entity: EventMedicalHistory): Promise<EventMedicalHistory> {
    const newEvent = await this.eventMedicalHistoryRepository.save(entity)
    return newEvent
  }
  public async update(id: string, entity: EventMedicalHistory): Promise<UpdateResult> {
    const updatedEvent: UpdateResult = await this.eventMedicalHistoryRepository.update(id, entity)
    return updatedEvent
  }
  public async delete(id: string): Promise<DeleteResult> {
    const deletedEvent: DeleteResult = await this.eventMedicalHistoryRepository.delete(id)
    return deletedEvent
  }
  public async findOne(id: string): Promise<EventMedicalHistory> {
    const eventMedicalHistory: EventMedicalHistory = await this.eventMedicalHistoryRepository
      .createQueryBuilder("eventMedicalHistory")
      .where({ id })
      .getOne()
    return eventMedicalHistory
  }
  findAllbyUser(userId: string) {
    throw new Error("Method not implemented.")
  }

  findAll(): Promise<EventMedicalHistory[]> {
    throw new Error("Method not implemented.")
  }
}
