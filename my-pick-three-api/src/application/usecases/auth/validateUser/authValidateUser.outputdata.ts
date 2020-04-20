import { IsNotEmpty, IsString, IsBoolean, IsNotEmptyObject, IsObject } from "class-validator";
import { User } from "src/domain/entities/user.entity";

export class AuthValidateUserOutputData {
    // @IsNotEmptyObject()
    // @IsObject()
    user: User | null
}