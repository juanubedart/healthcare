import { Repository } from "../Repository"
import { EventMedicalHistory } from "./EventMedicalHistory"

export abstract class EventMedicalHistoryRepository extends Repository<EventMedicalHistory> {
  abstract findAllbyUser(userId: string): Promise<EventMedicalHistory[]>
}
