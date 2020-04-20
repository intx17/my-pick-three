import { Module } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersInteractor } from 'src/application/usecases/users/UsersInteractor'
import { UsersController } from 'src/interfaces/controllers/users.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [TypeOrmModule],
    providers: [UsersInteractor],
    controllers: [UsersController]
  })
export class UsersModule {}
