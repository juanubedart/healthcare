import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common"
import { GetAllPatientsUseCase } from "../../application/useCases/Patients/GetAllPatientsUseCase"
import { Patient } from "../../domain/Patient/Patient"

import { DeletePatientUseCase } from "src/application/useCases/Patients/DeleteUserUseCase"
import { CreatePatientUseCase } from "../../application/useCases/Patients/CreatePatientUseCase"
import { GetByIdPatientUseCase } from "../../application/useCases/Patients/GetByIdPatientUseCase"
import { UpdatePatientUseCase } from "../../application/useCases/Patients/UpdatePatientUseCase"
import { PatientDto, PatientUpdateDto } from "../dto/PatientDto"
import { AuthGuard } from "../guards/auth.guard"

@Controller("patients")
@UseGuards(AuthGuard)
export class PatientsController {
  constructor(
    private readonly createPatientUseCase: CreatePatientUseCase,
    private readonly getByIdPatientUseCase: GetByIdPatientUseCase,
    private readonly getAllPatienstUseCase: GetAllPatientsUseCase,
    private readonly updatePatientUseCase: UpdatePatientUseCase,
    private readonly deletePatientUseCase: DeletePatientUseCase,
  ) {}

  @Post("register")
  public async registerPatient(@Body() body: PatientDto) {
    const patient = await this.createPatientUseCase.execute(body)
    return patient
  }
  @Get("all")
  public async getAllPatients() {
    const patients: Patient[] = await this.getAllPatienstUseCase.execute()
    return patients
  }

  @Get("/:id")
  public async getPatientById(@Param("id") id: string) {
    const patient: Patient = await this.getByIdPatientUseCase.execute(id)
    return patient
  }

  @Put("edit/:id")
  public async updatePatient(@Param("id") id: string, @Body() body: PatientUpdateDto) {
    const patient = await this.updatePatientUseCase.execute(id, body)
    return patient
  }

  @Delete("delete/:id")
  public async deletePatient(@Param("id") id: string) {
    const patient = await this.deletePatientUseCase.execute(id)
    return patient
  }
}
