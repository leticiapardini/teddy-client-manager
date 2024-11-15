import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/user.service';
import { UsersDto } from 'src/dtos/users.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUser(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':username')
  getUserByUsername(username: string): Promise<User> {
    return this.userService.findOneByUsername(username);
  }

  @Post()
  crateUser(@Body() user : UsersDto, @Res() response: Response) : Promise<string | any> {
    return this.userService.createUser(user, response)
  }
}