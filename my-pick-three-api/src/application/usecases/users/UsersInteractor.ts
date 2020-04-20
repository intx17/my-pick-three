import { Injectable } from '@nestjs/common'
import { User } from 'src/domain/entities/user.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { IUsersFindAllUseCase } from 'src/application/usecases/users/findAll/IUsersFindAllUseCase'
import { UsersFindAllOutputdata } from 'src/application/usecases/users/findAll/UsersFindAllOutputData'
import { IUsersSaveUseCase } from 'src/application/usecases/users/save/IUsersSaveUseCase'
import { UsersSaveInputData } from 'src/application/usecases/users/save/UsersSaveInputData'
import { UsersSaveOutputData } from 'src/application/usecases/users/save/UsersSaveOutputData'

@Injectable()
export class UsersInteractor implements IUsersFindAllUseCase, IUsersSaveUseCase {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findAllAsync(): Promise<UsersFindAllOutputdata> {
        return {
            users: await this.userRepository.find()
        }
    }

    async saveAsync(inputData: UsersSaveInputData): Promise<UsersSaveOutputData> {
        const user = new User();
        user.name = inputData.name
        user.password = inputData.name

        const savedUser = await this.userRepository.save(user)
            .catch((err: any) => {
                return null
            })

        const output: UsersSaveOutputData = {
            user: savedUser
        }
        return output
    }
}
