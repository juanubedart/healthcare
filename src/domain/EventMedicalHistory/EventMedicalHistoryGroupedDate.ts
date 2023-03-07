import { EventMedicalHistory } from "./EventMedicalHistory"
export interface EventMedicalHistoryGroupedDate {
  toDay: EventMedicalHistory[]
  tomorrow: EventMedicalHistory[]
  thisWeek: EventMedicalHistory[]
  thisMonth: EventMedicalHistory[]
  next: EventMedicalHistory[]
}
