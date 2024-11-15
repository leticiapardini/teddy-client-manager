import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [],
      //migrations: [__dirname + '/../migrations/*{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    //TypeOrmModule.forFeature([User, Client]),
  ],
})
export class DatabaseModule {}