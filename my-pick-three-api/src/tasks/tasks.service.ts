import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Task } from './task.entity'
import { Repository } from 'typeorm'
import { FindTaskRequestDto } from './dto/request/find-task.dto.request'
import { FindTaskResponseDto } from './dto/response/find-task.dto.response'
import { SaveTaskRequestDto } from './dto/request/save-task.dto.request'
import { SaveTaskResponseDto } from './dto/response/save-task.dto.response'

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>
    ) {}

    public async find(req: FindTaskRequestDto): Promise<FindTaskResponseDto> {
        if (!req.id) {
            return new FindTaskResponseDto()
        }
        return {
            task: await this.taskRepository.findOne({ id: req.id} )
        }
    }

    public async save(req: SaveTaskRequestDto): Promise<SaveTaskResponseDto> {
        if (!req.name) {
            return new SaveTaskResponseDto()
        }

        const task = new Task()
        task.name = req.name
        
        return {
            task: await this.taskRepository.save(task)
        }
    }
}
