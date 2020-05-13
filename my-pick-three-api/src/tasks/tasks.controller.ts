import { Controller, Post, HttpCode, Body, Put } from '@nestjs/common'
import { ApiTags, ApiResponse } from '@nestjs/swagger'
import { TasksService } from './tasks.service'
import { Task } from './task.entity'
import { FindTaskRequestDto } from './dto/request/find-task.dto.request'
import { SaveTaskRequestDto } from './dto/request/save-task.dto.request'

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
    constructor(
        private readonly tasksService: TasksService
    ) {}

    @Post()
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'OK', type: Task })
    async find(@Body() req: FindTaskRequestDto) {
        return await this.tasksService.find(req)
    }

    @Put('save')
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'OK', type: Task })
    async save(@Body() req: SaveTaskRequestDto) {
        return await this.tasksService.save(req)
    }
}
