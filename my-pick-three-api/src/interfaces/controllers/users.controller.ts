import { Controller, Get, Body, Post } from '@nestjs/common'
import { UsersInteractor } from 'src/application/usecases/users/UsersInteractor'
import { UsersSaveInputData } from 'src/application/usecases/users/save/UsersSaveInputData'

@Controller('users')
export class UsersController {
    constructor(private readonly interactor: UsersInteractor) {}

    @Get()
    async findAllAsync() {
        return await this.interactor.findAllAsync()
    }

    @Post()
    async saveAsync(@Body() inputData: UsersSaveInputData) {
        return await this.interactor.saveAsync(inputData)
    }
}
