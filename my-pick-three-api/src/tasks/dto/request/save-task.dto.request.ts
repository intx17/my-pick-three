import { IsDefined, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class SaveTaskRequestDto {
    @ApiProperty()
    @IsDefined({ always: true })
    @IsString({ always: true })
    name: string
}