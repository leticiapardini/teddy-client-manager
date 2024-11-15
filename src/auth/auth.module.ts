import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller'; 
import { UsersModule } from '../modules/users.module';
import { UsersService } from '../services/user.service';

@Module({
  imports: [UsersModule], 
  controllers: [AuthController],
  providers: [UsersService], 
})
export class AuthModule {}
