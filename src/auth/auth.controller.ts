import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { UsersDto } from '../dtos/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

  @Post('/login')
  async login(@Body() body: UsersDto) {
    const { username, password } = body;
    
    const user = await this.userService.validateUser(username, password);
    
    if (!user) {
      throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
    }
    
    return { message: 'Login bem-sucedido', username }; // padronizar retorno
  }
}