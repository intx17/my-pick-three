import { Injectable } from '@nestjs/common';
import { IAuthUseCase } from 'src/application/usecases/auth/auth.usecase';
import { UsersInteractor } from 'src/application/usecases/users/users.interactor';
import { AuthValidateUserInputData } from 'src/application/usecases/auth/validateUser/authValidateUser.inputdata';
import { AuthValidateUserOutputData } from 'src/application/usecases/auth//validateUser/authValidateUser.outputdata';

@Injectable()
export class AuthInteractor implements IAuthUseCase {
    constructor(private usersInteractor: UsersInteractor) { }

    async handleValidateUserAsync(inputData: AuthValidateUserInputData): Promise<AuthValidateUserOutputData> {
        const output = await this.usersInteractor.handleFindOneByName({
            name: inputData.name,
        });
        const user = output.user;
        if (user && user.password === inputData.password) {
            return {
                user
            };
        }
        return {
            user: null
        };
    }
}
