import { IsString, IsNotEmpty, IsOptional, IsInt, Min, IsNumber } from 'class-validator'

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number
}

export class UpdateClientDto {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  company?: string

  @IsOptional()
  @IsString()
  wage?: string
}

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  company?: string

  @IsNotEmpty()
  @IsString()
  wage?: string

  @IsNotEmpty()
  @IsNumber()
  userId: number
}