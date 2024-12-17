import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { LoginDTO } from 'src/dto/login.dto';
import { UserService } from 'src/services/user/user.service';

@Controller('api/v1/auth')
export class AuthController {

    constructor(private readonly userService: UserService) { }

    @ApiOperation({ summary: 'Authenticate User' })
    @ApiCreatedResponse({ description: 'JWT Token' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiBody({ type: LoginDTO })
    @Post()
    async loginUser(@Body() loginDTO: LoginDTO) {
        const token = await this.userService.loginUser(loginDTO);
        return { token };
    }


}
