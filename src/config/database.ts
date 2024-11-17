import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'NestJs',
  synchronize: true,
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  autoLoadEntities: true, 
}
