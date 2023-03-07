import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common"
import { GetByUserEventsMedicalHistoryUseCase } from "src/application/useCases/EventMedicalHistory/GetByUserEventsMedicalHistoryUseCase"
import { GetByUserGroupedEventsMedicalHistoryUseCase } from "src/application/useCases/EventMedicalHistory/GetByUserGroupedEventsMedicalHistoryUseCase"
import { CreateEventMedicalHistoryUseCase } from "../../application/useCases/EventMedicalHistory/CreateEventMedicalHistoryUseCase"
import { DeleteEventMedicalHistoryUseCase } from "../../application/useCases/EventMedicalHistory/DeleteEventMedicalHistoryUseCase"
import { GetByIdEventMedicalHistoryUseCase } from "../../application/useCases/EventMedicalHistory/GetByIdEventMedicalHIstoryUseCase"
import { UpdateEventMedicalHistoryUseCase } from "../../application/useCases/EventMedicalHistory/UpdateEventMedicalHistory"
import { EventMedicalHistoryDto, EventMedicalHistoryUpdateDto } from "../dto/EventMedicalHistoryDto"
import { AuthGuard } from "../guards/auth.guard"

@Controller("event-medical-history")
@UseGuards(AuthGuard)
export class EventMedicalHistoryController {
  constructor(
    private readonly createEventMedicalHistoryUseCase: CreateEventMedicalHistoryUseCase,
    private readonly getByIdEventMedicalHistoryUseCase: GetByIdEventMedicalHistoryUseCase,
    private readonly updateEventMedicalHistoryUseCase: UpdateEventMedicalHistoryUseCase,
    private readonly deleteEventMedicalHistoryUseCase: DeleteEventMedicalHistoryUseCase,
    private readonly getByUserEventsMedicalHistoryUseCase: GetByUserEventsMedicalHistoryUseCase,
    private readonly getByUserGroupedEventsMedicalHistoryUseCase: GetByUserGroupedEventsMedicalHistoryUseCase,
  ) {}

  @Post("register")
  public async registerEventMedicalHistory(@Body() body: EventMedicalHistoryDto) {
    const eventMedicalHistory = await this.createEventMedicalHistoryUseCase.execute(body)
    return eventMedicalHistory
  }

  @Get("/:id")
  public async getEventById(@Param("id") id: string) {
    const event = await this.getByIdEventMedicalHistoryUseCase.execute(id)
    return event
  }

  @Get("user/:id")
  public async getEventsByUser(@Param("id") id: string) {
    const events = await this.getByUserEventsMedicalHistoryUseCase.execute(id)
    return events
  }

  @Get("grouped/user/:id")
  public async getEventsGroupedByUser(@Param("id") id: string) {
    const events = await this.getByUserGroupedEventsMedicalHistoryUseCase.execute(id)
    return events
  }

  @Put("edit/:id")
  public async UpdateEvent(@Param("id") id: string, @Body() body: EventMedicalHistoryUpdateDto) {
    const event = await this.updateEventMedicalHistoryUseCase.execute(id, body)
    return event
  }

  @Delete("delete/:id")
  public async DeleteEvent(@Param("id") id: string) {
    const event = await this.deleteEventMedicalHistoryUseCase.execute(id)
    return event
  }
}
