import { AuthValidateUserInputData } from 'src/application/usecases/auth/validateUser/authValidateUser.inputdata';
import { AuthValidateUserOutputData } from 'src/application/usecases/auth/validateUser/authValidateUser.outputdata';

export interface IAuthUseCase {
    handleValidateUserAsync(inputData: AuthValidateUserInputData): Promise<AuthValidateUserOutputData>
}