import { Body, Controller, Post, Req } from '@nestjs/common';
import { UserEntity } from 'src/db/persistence/user.entity';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { Authorization } from 'src/decorators/auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UserService } from 'src/services/user/user.service';

@Controller('api/v1/user')
export class UserController {

    constructor(private readonly userService:UserService){}

    @Authorization(true)
    @AuthUser()
    @Roles('ADMIN_ROLE')
    @Post()
    async createUser(@Body() createUserDto:CreateUserDTO, @Req() req){
        return await this.userService.createUser(createUserDto,req.user)
    }

}
