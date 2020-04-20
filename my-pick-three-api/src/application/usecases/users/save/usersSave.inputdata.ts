import { IsNotEmpty, IsString } from 'class-validator';

export class UsersSaveInputData {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    password: string
}