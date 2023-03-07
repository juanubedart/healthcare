import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CreateEventMedicalHistoryUseCase } from "src/application/useCases/EventMedicalHistory/CreateEventMedicalHistoryUseCase"
import { DeleteEventMedicalHistoryUseCase } from "src/application/useCases/EventMedicalHistory/DeleteEventMedicalHistoryUseCase"
import { GetByUserEventsMedicalHistoryUseCase } from "src/application/useCases/EventMedicalHistory/GetByUserEventsMedicalHistoryUseCase"
import { GetByUserGroupedEventsMedicalHistoryUseCase } from "src/application/useCases/EventMedicalHistory/GetByUserGroupedEventsMedicalHistoryUseCase"
import { GetByIdEventMedicalHistoryUseCase } from "../../application/useCases/EventMedicalHistory/GetByIdEventMedicalHIstoryUseCase"
import { UpdateEventMedicalHistoryUseCase } from "../../application/useCases/EventMedicalHistory/UpdateEventMedicalHistory"
import { EventMedicalHistoryRepository } from "../../domain/EventMedicalHistory/EventMedicalHistoryRepository"
import { EventMedicalHistoryController } from "../controllers/eventsMedicalHistorycontroller"
import { EventsMedicalHistory } from "../entities/EventMedicalHistory"
import { TypeOrmEventsMedicalHistoryRepository } from "../repositories/TypeOrmEventsMedicalHistoryRepository"
import { UsersModule } from "./users.module"

@Module({
  imports: [TypeOrmModule.forFeature([EventsMedicalHistory]), UsersModule],
  providers: [
    {
      provide: EventMedicalHistoryRepository,
      useClass: TypeOrmEventsMedicalHistoryRepository,
    },
    CreateEventMedicalHistoryUseCase,
    GetByIdEventMedicalHistoryUseCase,
    UpdateEventMedicalHistoryUseCase,
    DeleteEventMedicalHistoryUseCase,
    GetByUserEventsMedicalHistoryUseCase,
    GetByUserGroupedEventsMedicalHistoryUseCase,
  ],
  controllers: [EventMedicalHistoryController],
})
export class EventMedicalHistoryModule {}
