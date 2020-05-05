import * as bcrypt from 'bcrypt';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindByNameUserRequestDto } from './dto/request/find-by-name-user-request.dto';
import { SaveUserRequestDto } from './dto/request/save-user-request.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    public async findByusername(req: FindByNameUserRequestDto): Promise<User> {
        return await this.userRepository.findOne({username: req.username});
    }

    public async save(req: SaveUserRequestDto): Promise<User> {
        const userExists = await this.userRepository.count({ username: req.username}) >= 1;
        if (userExists) {
            throw new HttpException({
				error: 'User',
				message: 'The user already exists.'
			}, HttpStatus.BAD_REQUEST); 
        }

        const encryptedPassword = await bcrypt.hash(req.password, 10);
        const user = new User();
        user.username = req.username;
        user.password = encryptedPassword;

        const savedUser = await this.userRepository.save(user)
            .catch(_ => {
                return null;
            });

        if (!savedUser) {
            throw new HttpException({
				error: 'User',
				message: `Failed to Save User`
			}, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return savedUser;
    }
}
