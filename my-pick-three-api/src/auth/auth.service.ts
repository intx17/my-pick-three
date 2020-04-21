import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { CredentialsDto } from './dto/credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    }

    async validateUser(credentials: CredentialsDto): Promise<User> {
        const user = await this.userRepository.findOne({username: credentials.username});
        console.log(user);
        if (user && user.password === credentials.password) {
            return user;
        }
        return null;
    }
}
