import { Controller, Post, HttpCode, Body, Put } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { SaveUserRequestDto } from './dto/request/save-user-request.dto';
import { FindByNameUserRequestDto } from './dto/request/find-by-name-user-request.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(
		private readonly usersService: UsersService
    ) {}
    
    @Post()
	@HttpCode(200)
    @ApiResponse({ status: 200, description: 'OK', type: User })
    async findByusername(@Body() req: FindByNameUserRequestDto) {
        return await this.usersService.findByusername(req);
    }

    @Put('/save')
	@HttpCode(200)
    @ApiResponse({ status: 200, description: 'OK', type: User })
    async save(@Body() req: SaveUserRequestDto) {
        return await this.usersService.save(req);
    }
}
