import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller'; 
import { UsersModule } from '../modules/users.module';
import { UsersService } from '../services/user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY, 
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME || '1h' },
    }),
  ], 
  controllers: [AuthController],
  providers: [UsersService], 
})
export class AuthModule {}
