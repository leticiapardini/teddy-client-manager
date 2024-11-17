import { IsString, IsNotEmpty, MinLength, IsOptional, IsInt, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}

export class UpdateClientDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  wage?: string;
}

export class CreateClientDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  company?: string;

  @IsOptional()
  wage?: string;

  @IsNotEmpty()
  userId: number;
}