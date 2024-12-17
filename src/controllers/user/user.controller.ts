import { Body, Controller, Delete, Param, ParseIntPipe, Post, Req } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserEntity } from 'src/db/persistence/user.entity';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { Authorization } from 'src/decorators/auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UserService } from 'src/services/user/user.service';

@Controller('api/v1/user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @ApiOperation({ summary: 'Create new user' })
    @ApiCreatedResponse({ description: 'User created' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiUnauthorizedResponse({ description: 'Token invalid, token expired, token not provided, permission dennied' })
    @ApiBearerAuth()
    @ApiBody({type:CreateUserDTO})
    @Authorization()
    @Roles('ADMIN_ROLE')
    @Post()
    async createUser(@Body() createUserDto: CreateUserDTO, @AuthUser() user: UserEntity) {
        return await this.userService.createUser(createUserDto, user)
    }

    @ApiOperation({ summary: 'Delete user' })
    @ApiCreatedResponse({ description: 'User deleted success message' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiUnauthorizedResponse({ description: 'Token invalid, token expired, token not provided, permission dennied' })
    @ApiBearerAuth()
    @ApiParam({name:"id",type:Number,required:true})
    @Authorization()
    @Roles('ADMIN_ROLE')
    @Delete(':id')
    async deleteUser(@Param('id', new ParseIntPipe()) id: number, @AuthUser() user: UserEntity) {
        return await this.userService.deleteUser(id, user);
    }

}
