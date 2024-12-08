import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/db/database.module';

@Module({
    imports:[
        DatabaseModule,
        JwtModule.register({
            global: true,
            secret: process.env.PRIVATEKEY,
            signOptions: { expiresIn: '2h' },
          }),
    ],
    providers:[],
    exports:[]
})
export class ServiceModule {}
