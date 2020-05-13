import { Test, TestingModule } from '@nestjs/testing'
import { UsersController } from '../../src/users/users.controller'
import { UsersService } from '../../src/users/users.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from '../../src/users/user.entity'

const mockRepository = jest.fn(() => ({}))

describe('Users Controller', () => {
  let controller: UsersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository
        }
      ]
    }).compile()

    controller = module.get<UsersController>(UsersController)
  })
it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
