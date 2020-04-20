import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/controllers/users.controller';
import { UsersInteractor } from 'src/application/usecases/users/users.interactor';
import { UsersModule } from './users.module';
import { User } from '../domain/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db-server',
      port: 3306,
      database: 'develop',
      username: 'develop',
      password: 'password',
      entities: [User],
      synchronize: true,
      keepConnectionAlive: true
    }),
    UsersModule
  ],
  controllers: [UsersController],
  providers: [UsersInteractor],
})
export class AppModule {}
