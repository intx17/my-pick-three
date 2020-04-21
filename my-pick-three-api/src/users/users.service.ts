import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindByNameUserRequestDto } from './dto/request/find-by-name-user-request.dto';
import { SaveUserRequestDto } from './dto/request/save-user-request.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    }

    public async findByUserName(req: FindByNameUserRequestDto): Promise<User> {
        return await this.userRepository.findOne({userName: req.userName});
    }

    public async save(req: SaveUserRequestDto): Promise<User> {
        const user = new User();
        user.userName = req.userName;
        user.password = req.password;

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
