import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IUsersUseCase } from 'src/application/usecases/users/users.usecase';
import { UsersFindAllOutputdata } from 'src/application/usecases/users/findAll/usersFindAll.outputdata';
import { UsersFindOneByNameInputData } from 'src/application/usecases/users/findOneByName/usersFindOneByName.inputdata';
import { UsersFindOneByNameOutputdata } from 'src/application/usecases/users/findOneByName/usersFindOneByName.outputdata';
import { UsersSaveInputData } from 'src/application/usecases/users/save/usersSave.inputdata';
import { UsersSaveOutputData } from 'src/application/usecases/users/save/usersSave.outputdata';

@Injectable()
export class UsersInteractor implements IUsersUseCase {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async handleFindOneByName(inputData: UsersFindOneByNameInputData): Promise<UsersFindOneByNameOutputdata> {
        return {
            user: await this.userRepository.findOne({name: inputData.name})
        };
    }

    async handleFindAllAsync(): Promise<UsersFindAllOutputdata> {
        return {
            users: await this.userRepository.find()
        };
    }

    async handleSaveAsync(inputData: UsersSaveInputData): Promise<UsersSaveOutputData> {
        const user = new User();
        user.name = inputData.name;
        user.password = inputData.name;

        const savedUser = await this.userRepository.save(user)
            .catch((err: any) => {
                return null;
            });

        const output: UsersSaveOutputData = {
            user: savedUser
        };
        return output;
    }
}
