import { Module } from '@nestjs/common';
import { AuthInteractor } from 'src/application/usecases/auth/auth.interactor';

@Module({
  providers: [AuthInteractor]
})
export class AuthModule {}
