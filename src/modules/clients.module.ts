import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clients } from '../entities/clients.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clients])],
  providers: [],
  controllers: [],
})
export class ClientsModule {}