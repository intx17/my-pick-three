import { ApiTags, ApiResponse } from '@nestjs/swagger'
import { Controller, Post, HttpCode, UseGuards, Request } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { User } from 'src/users/user.entity'
import { AuthService } from 'src/auth/auth.service'
import { LoginResponse } from './dto/response/login.response'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(AuthGuard('local'))
    @Post('login')
	@HttpCode(200)
	@ApiResponse({ status: 200, description: 'OK', type: User })
	public async login(@Request() req): Promise<LoginResponse> {
		return this.authService.login(req.user)
	}
}