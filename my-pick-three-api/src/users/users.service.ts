import * as bcrypt from 'bcrypt'
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { User } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FindUserByNameRequestDto } from './dto/request/find-user-by-name.dto.request'
import { SaveUserRequestDto } from './dto/request/save-user.dto.request'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    public async findByUsername(req: FindUserByNameRequestDto): Promise<User> {
        return await this.userRepository.findOne({username: req.username})
    }

    public async save(req: SaveUserRequestDto): Promise<User> {
        const userExists = await this.userRepository.count({ username: req.username}) >= 1
        if (userExists) {
            throw new HttpException({
				error: 'User',
				message: 'The user already exists.'
			}, HttpStatus.BAD_REQUEST) 
        }

        const encryptedPassword = await bcrypt.hash(req.password, 10)
        const user = new User()
        user.username = req.username
        user.password = encryptedPassword

        const savedUser = await this.userRepository.save(user)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch(_ => {
                return null
            })
if (!savedUser) {
            throw new HttpException({
				error: 'User',
				message: `Failed to Save User`
			}, HttpStatus.INTERNAL_SERVER_ERROR)
        }

        return savedUser
    }
}
