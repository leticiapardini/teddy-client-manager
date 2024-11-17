import { Body, ConflictException, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common'
import { User } from '../entities/user.entity'
import { UsersService } from '../services/user.service'
import { UsersDto } from '../dtos/users.dto'
import { Response } from 'express'
import { ERROR_MESSAGES } from '../constants/message.constants'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUser(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Get(':username')
  getUserByUsername(username: string): Promise<User> {
    return this.userService.findOneByUsername(username)
  }

  @Post()
  async createUser(@Body() newUser: UsersDto, @Res() response: Response) {
    try {
      const user = await this.userService.create(newUser)
      return response.status(HttpStatus.CREATED).json(user)
    } catch (error) {
      if (error instanceof ConflictException) {
        return response.status(HttpStatus.CONFLICT).json({ message: error.message })
      }
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: ERROR_MESSAGES.UNEXPECTED_ERROR })
    }
  }
}