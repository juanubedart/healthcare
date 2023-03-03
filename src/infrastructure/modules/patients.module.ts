import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { DeletePatientUseCase } from "src/application/useCases/Patients/DeleteUserUseCase"
import { CreatePatientUseCase } from "../../application/useCases/Patients/CreatePatientUseCase"
import { GetAllPatientsUseCase } from "../../application/useCases/Patients/GetAllPatientsUseCase"
import { GetByIdPatientUseCase } from "../../application/useCases/Patients/GetByIdPatientUseCase"
import { UpdatePatientUseCase } from "../../application/useCases/Patients/UpdatePatientUseCase"
import { GetByIdUserUseCase } from "../../application/useCases/Users/GetByIdUserUseCase"
import { PatientRepository } from "../../domain/Patient/PatientRepository"
import { PatientsController } from "../controllers/patients.controller"
import { Patients } from "../entities/PatientEntity"
import { TypeOrmPatientsRepository } from "../repositories/TypeOrmPatientsRepository"
import { UsersModule } from "./users.module"

@Module({
  imports: [TypeOrmModule.forFeature([Patients]), UsersModule],
  providers: [
    {
      provide: PatientRepository,
      useClass: TypeOrmPatientsRepository,
    },
    CreatePatientUseCase,
    GetByIdPatientUseCase,
    GetByIdUserUseCase,
    GetAllPatientsUseCase,
    UpdatePatientUseCase,
    DeletePatientUseCase,
  ],
  controllers: [PatientsController],
})
export class PatientsModule {}
