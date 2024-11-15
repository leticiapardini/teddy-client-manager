import { Controller, Get } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/user.service';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getHello(): Promise<User[]> {
    return this.userService.findAll();
  }
}