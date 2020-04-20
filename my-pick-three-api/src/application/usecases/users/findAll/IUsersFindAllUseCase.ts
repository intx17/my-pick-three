import { UsersFindAllOutputdata } from 'src/application/usecases/users/findAll/UsersFindAllOutputData'

export interface IUsersFindAllUseCase {
    findAllAsync(): Promise<UsersFindAllOutputdata>
}