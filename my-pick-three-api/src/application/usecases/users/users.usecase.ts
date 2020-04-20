import { UsersFindAllOutputdata } from 'src/application/usecases/users/findAll/usersFindAll.outputdata'
import { UsersFindOneByNameInputData } from 'src/application/usecases/users/findOneByName/usersFindOneByName.inputdata'
import { UsersFindOneByNameOutputdata } from 'src/application/usecases/users/findOneByName/usersFindOneByName.outputdata'
import { UsersSaveInputData } from "src/application/usecases/users/save/usersSave.inputdata"
import { UsersSaveOutputData } from "src/application/usecases/users/save/usersSave.outputdata"

export interface IUsersUseCase {
    handleFindAllAsync(): Promise<UsersFindAllOutputdata>
    handleFindOneByName(inputData: UsersFindOneByNameInputData): Promise<UsersFindOneByNameOutputdata>
    handleSaveAsync(inputData: UsersSaveInputData): Promise<UsersSaveOutputData>
}