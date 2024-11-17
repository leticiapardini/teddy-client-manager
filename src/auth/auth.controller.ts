import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersDto } from '../dtos/users.dto';
import { UsersService } from '../services/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/login')
  async login(@Body() body: UsersDto) {
    const { username, password } = body
    const user = await this.userService.validateUser(username, password);
    if (!user) {
      throw new HttpException(
        { message: 'Credenciais inválidas' },
        HttpStatus.UNAUTHORIZED,
      )
    }
    const payload = { username: user.username, sub: user.id }
    const token = this.jwtService.sign(payload);
    return {
      message: 'Login bem-sucedido',
      data: { username: user.username, token },
    }
  }
}