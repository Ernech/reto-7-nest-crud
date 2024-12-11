import { Module } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { RoleGuard } from './role.guard';
import { TokenGuard } from './token.guard';
import { TrimPipe } from './trim.pipe.guard';
import { ServiceModule } from 'src/services/service.module';

@Module({

    imports:[ServiceModule],
    providers:[
        {
            provide:APP_PIPE,
            useClass:TrimPipe
        }
    ]

})
export class GuardModule {}