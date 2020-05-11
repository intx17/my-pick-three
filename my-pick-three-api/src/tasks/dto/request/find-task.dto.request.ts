import { IsDefined, IsNumber } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class FindTaskRequestDto {
    @ApiProperty()
    @IsDefined({ always: true })
    @IsNumber()
    id: number
}