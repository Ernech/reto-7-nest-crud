import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from 'src/dto/login.dto';
import { UserService } from 'src/services/user/user.service';

@Controller('api/v1/auth')
export class AuthController {

    constructor(private readonly userService:UserService){}
    

    @Post()
    async loginUser(@Body() loginDTO:LoginDTO){
        const token = await this.userService.loginUser(loginDTO);
        return {token};
    }


}
