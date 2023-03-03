import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator"
export class EventMedicalHistoryDto {
  @IsNotEmpty()
  @IsDate()
  initialDate: Date

  @IsDate()
  @IsOptional()
  endDate: Date

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsBoolean()
  saveToCalendar: boolean

  @IsNotEmpty()
  @IsString()
  patient: string
}

export class EventMedicalHistoryUpdateDto {
  @IsOptional()
  @IsDate()
  initialDate: Date

  @IsDate()
  @IsOptional()
  endDate: Date

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsBoolean()
  saveToCalendar: boolean

  @IsOptional()
  @IsString()
  patient: string
}
