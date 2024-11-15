import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUsersDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

}