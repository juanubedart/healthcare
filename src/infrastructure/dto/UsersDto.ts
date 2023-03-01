import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UserDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  surname: string

  @IsNotEmpty()
  @IsString()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  lang: string
}

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  surname: string

  @IsOptional()
  @IsOptional()
  email: string

  @IsOptional()
  @IsString()
  password: string

  @IsOptional()
  @IsString()
  lang: string
}
