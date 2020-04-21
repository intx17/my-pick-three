import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { Controller, Post, HttpCode, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	@UseGuards(AuthGuard('local'))
    @Post('login')
	@HttpCode(200)
	@ApiResponse({ status: 200, description: 'OK', type: User })
	public async login(@Request() req): Promise<User> {
		return req.user;
	}
}