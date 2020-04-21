import { IsString, IsDefined } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SaveUserRequestDto {
    @IsDefined({ always: true })
    @IsString({ always: true })
    @ApiProperty()
    userName: string

    @IsDefined({ always: true })
    @IsString({ always: true })
    @ApiProperty()
    password: string
}