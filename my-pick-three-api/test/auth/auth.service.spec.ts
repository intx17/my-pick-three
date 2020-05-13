import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from '../../src/auth/auth.service'
import { User } from '../../src/users/user.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import { JwtService, JwtModule } from '@nestjs/jwt'
import { jwtConstants } from '../../src/auth/constants'
import { LocalStrategy } from '../../src/auth/strategies/local.strategy'
import { PassportModule } from '@nestjs/passport'

const mockRepository = jest.fn(() => ({}))

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secretOrPrivateKey: process.env.SECRETKEY || 'secretKey',
          signOptions: {
            expiresIn: 3600,
          },
        }),
      ],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository
        }
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })
it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
