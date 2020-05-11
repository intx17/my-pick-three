import { ApiProperty } from "@nestjs/swagger"
import { Task } from "src/tasks/task.entity"

export class SaveTaskResponseDto {
    @ApiProperty()
    task: Task
}