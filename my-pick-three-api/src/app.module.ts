import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersController } from './users/users.controller'
import { UsersModule } from './users/users.module'
import { User } from './users/user.entity'
import { AuthService } from './auth/auth.service'
import { UsersService } from './users/users.service'
import { AuthController } from './auth/auth.controller'
import { AuthModule } from './auth/auth.module'
import { TasksModule } from './tasks/tasks.module'
import { TasksController } from './tasks/tasks.controller'
import { TasksService } from './tasks/tasks.service'
import { Task } from './tasks/task.entity'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [User, Task],
      synchronize: true,
      keepConnectionAlive: true
    }),
    AuthModule,
    UsersModule,
    TasksModule
  ],
  controllers: [AuthController, UsersController, TasksController],
  providers: [AuthService, UsersService, TasksService],
})
export class AppModule {}
