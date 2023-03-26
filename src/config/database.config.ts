import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const database: () => TypeOrmModuleOptions = () => ({
  charset: 'utf8mb4',
  logging: ['error'],
  type: 'mysql',
  host: 'mistyu.com',
  password: '123456',
  database: 'nestjs',
  synchronize: true,
  autoLoadEntities: true
})
