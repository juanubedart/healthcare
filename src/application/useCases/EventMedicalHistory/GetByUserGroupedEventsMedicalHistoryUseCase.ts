import { Inject, Injectable } from "@nestjs/common"
import { REQUEST } from "@nestjs/core"
import { Request } from "express"
import * as moment from "moment"
import { TranslatorService } from "nestjs-translator"
import { EventMedicalHistory } from "../../../domain/EventMedicalHistory/EventMedicalHistory"
import { EventMedicalHistoryGroupedDate } from "../../../domain/EventMedicalHistory/EventMedicalHistoryGroupedDate"
import { EventMedicalHistoryRepository } from "../../../domain/EventMedicalHistory/EventMedicalHistoryRepository"
import { ErrorManager } from "../../../infrastructure/errorHandler/ErrorManager"

@Injectable()
export class GetByUserGroupedEventsMedicalHistoryUseCase {
  constructor(
    @Inject(EventMedicalHistoryRepository)
    private readonly eventMedicalHistoryRepository: EventMedicalHistoryRepository,
    private readonly translator: TranslatorService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  public async execute(userId: string): Promise<EventMedicalHistoryGroupedDate> {
    try {
      const events: EventMedicalHistory[] = await this.eventMedicalHistoryRepository.findAllbyUser(userId)
      if (!events || events.length === 0) {
        throw new ErrorManager({
          type: "BAD_REQUEST",
          message: this.translator.translate("THE_USER_HAVENT_EVENT", { lang: this.request.lang }),
        })
      }

      const dateNow = moment()

      const eventsToDay: EventMedicalHistory[] = []
      const eventsTomorrow: EventMedicalHistory[] = []
      const eventsThisWeek: EventMedicalHistory[] = []
      const eventsThisMonth: EventMedicalHistory[] = []
      const eventsNext: EventMedicalHistory[] = []

      for (const event of events) {
        const dateAux = moment(event.initialDate)

        if (dateAux.diff(dateNow, "days") == 0) {
          eventsToDay.push(event)
          continue
        }

        if (dateAux.diff(dateNow, "days") === 1) {
          eventsTomorrow.push(event)
          continue
        }

        if (dateAux.diff(dateNow, "day") > 1 && dateAux.format("w") === dateNow.format("w")) {
          eventsThisWeek.push(event)
          continue
        }

        if (dateAux.diff(dateNow, "day") > 1 && dateAux.get("months") === dateNow.get("months")) {
          eventsThisMonth.push(event)
          continue
        }

        if (dateAux.get("months") > dateNow.get("months")) {
          eventsNext.push(event)
          continue
        }
      }

      const groupedEvets: EventMedicalHistoryGroupedDate = {
        toDay: eventsToDay,
        tomorrow: eventsTomorrow,
        thisWeek: eventsThisWeek,
        thisMonth: eventsThisMonth,
        next: eventsNext,
      }

      if (
        groupedEvets.toDay.length === 0 &&
        groupedEvets.tomorrow.length === 0 &&
        groupedEvets.thisWeek.length === 0 &&
        groupedEvets.thisMonth.length === 0 &&
        groupedEvets.next.length === 0
      ) {
        throw new ErrorManager({
          type: "OK",
          message: this.translator.translate("THE_USER_HAVENT_EVENT", { lang: this.request.lang }),
        })
      }

      return groupedEvets
    } catch (error) {
      throw ErrorManager.createSignature(error.message)
    }
  }
}
