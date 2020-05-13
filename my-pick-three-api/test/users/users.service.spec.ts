import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from '../../src/users/users.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { User } from '../../src/users/user.entity'

const mockRepository = jest.fn(() => ({}))

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository
        }
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })
it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
