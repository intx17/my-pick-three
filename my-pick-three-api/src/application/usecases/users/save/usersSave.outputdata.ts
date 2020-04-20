import { IsNotEmpty, IsString, IsNotEmptyObject, IsObject } from 'class-validator'
import { User } from 'src/domain/entities/user.entity'

export class UsersSaveOutputData {
    @IsNotEmptyObject()
    @IsObject()
    user: User
}