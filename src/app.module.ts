import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './modules/users.module';
import { ClientsModule } from './modules/clients.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    //entities: [],
    synchronize: true,
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    autoLoadEntities: true,
  }),
UsersModule,
ClientsModule,
AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
