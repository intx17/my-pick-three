import { ApiProperty } from "@nestjs/swagger"
import { Task } from "../../../tasks/task.entity"

export class FindTaskResponseDto {
    @ApiProperty()
    task: Task
}