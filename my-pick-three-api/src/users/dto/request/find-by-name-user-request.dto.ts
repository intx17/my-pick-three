import { IsString, IsDefined } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FindByNameUserRequestDto {
    @ApiProperty()
    @IsDefined({ always: true })
    @IsString({ always: true })
    username: string
}