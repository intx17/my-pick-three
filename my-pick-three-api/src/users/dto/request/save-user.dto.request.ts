import { IsString, IsDefined } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class SaveUserRequestDto {
    @IsDefined({ always: true })
    @IsString({ always: true })
    @ApiProperty()
    username: string

    @IsDefined({ always: true })
    @IsString({ always: true })
    @ApiProperty()
    password: string
}