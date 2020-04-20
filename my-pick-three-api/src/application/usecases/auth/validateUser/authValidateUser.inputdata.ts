import { IsNotEmpty, IsString } from "class-validator"

export class AuthValidateUserInputData {
    @IsNotEmpty()
    @IsString()
    name: string
    
    @IsNotEmpty()
    @IsString()
    password: string
}