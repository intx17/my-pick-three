import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthInteractor } from 'src/application/usecases/auth/auth.interactor';
import { AuthValidateUserInputData } from '../usecases/auth/validateUser/authValidateUser.inputdata';
import { User } from 'src/domain/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private interactor: AuthInteractor) {
    super();
  }

  async validate(name: string, password: string): Promise<User> {
    const inputData: AuthValidateUserInputData = {
      name,
      password
    };

    const output = await this.interactor.handleValidateUserAsync(inputData);
    if (!output.user) {
      throw new UnauthorizedException();
    }
    return output.user;
  }
}