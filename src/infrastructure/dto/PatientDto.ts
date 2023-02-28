import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class PatientDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  surname: string

  @IsOptional()
  @IsDate()
  birthdate: Date

  @IsOptional()
  @IsNumber()
  weight: number

  @IsNotEmpty()
  @IsString()
  user: string
}

export class PatientUpdateDto {
  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  surname: string

  @IsOptional()
  birthdate: Date

  IsOptional
  @IsNumber()
  weight: number
}
