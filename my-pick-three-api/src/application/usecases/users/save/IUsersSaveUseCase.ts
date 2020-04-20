import { UsersSaveInputData } from "src/application/usecases/users/save/UsersSaveInputData"
import { UsersSaveOutputData } from "src/application/usecases/users/save/UsersSaveOutputData"

export interface IUsersSaveUseCase {
   saveAsync(inputData: UsersSaveInputData): Promise<UsersSaveOutputData>
}