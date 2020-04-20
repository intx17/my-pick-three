import { IsNotEmpty, IsString } from 'class-validator';

export class UsersFindOneByNameInputData {
    @IsNotEmpty()
    @IsString()
    name: string
}