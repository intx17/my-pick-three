import { ApiProperty } from "@nestjs/swagger"
import { Task } from "../../task.entity"

export class SaveTaskResponseDto {
    @ApiProperty()
    task: Task
}