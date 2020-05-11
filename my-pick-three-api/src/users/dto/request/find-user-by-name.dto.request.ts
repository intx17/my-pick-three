import { IsString, IsDefined } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class FindUserByNameRequestDto {
    @ApiProperty()
    @IsDefined({ always: true })
    @IsString({ always: true })
    username: string
}