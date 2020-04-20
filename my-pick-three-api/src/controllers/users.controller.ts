import { Controller, Get, Body, Post } from '@nestjs/common'
import { UsersInteractor } from 'src/application/usecases/users/users.interactor'
import { UsersSaveInputData } from 'src/application/usecases/users/save/usersSave.inputdata'
import { UsersFindOneByNameInputData } from 'src/application/usecases/users/findOneByName/usersFindOneByName.inputdata'

@Controller('users')
export class UsersController {
    constructor(private readonly interactor: UsersInteractor) {}

    @Get()
    async findAllAsync() {
        return await this.interactor.handleFindAllAsync()
    }

    @Post()
    async findOneByName(@Body() inputData: UsersFindOneByNameInputData) {
        return await this.interactor.handleFindOneByName(inputData)
    }

    @Post('/save')
    async saveAsync(@Body() inputData: UsersSaveInputData) {
        return await this.interactor.handleSaveAsync(inputData)
    }
}
