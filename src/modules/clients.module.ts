import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Clients } from '../entities/clients.entity'
import { ClientsService } from '../services/clients.service'
import { ClientsController } from '../controllers/clients.controller'
import { User } from '../entities/user.entity'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([Clients, User]), AuthModule],
  providers: [ClientsService],
  controllers: [ClientsController],
})
export class ClientsModule {}