import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDto {
    @ApiProperty()
    @IsString()
    readonly userName: string;

    @ApiProperty()
    @IsString()
    readonly password: string;
}