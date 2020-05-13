import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { User } from '../users/user.entity'
import { CredentialsDto } from './dto/credentials.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { Repository } from 'typeorm'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    )
    {}

    async validateUser(credentials: CredentialsDto): Promise<User> {
        const user = await this.userRepository.findOne({username: credentials.username})
        console.log(user)
        if (user) {
            const isMatched = await bcrypt.compare(credentials.password, user.password)
            return isMatched ? user : null
        }
        return null
    }

    async login(user: User) {
        const payload = { username: user.username, sub: user.id }
        return {
          accessToken: this.jwtService.sign(payload),
        }
      }
}
