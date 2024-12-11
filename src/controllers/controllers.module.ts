import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/services/service.module';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';

@Module({
    imports:[ServiceModule],
    controllers:[UserController, AuthController]
})
export class ControllersModule {}
