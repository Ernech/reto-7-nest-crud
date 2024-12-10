import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/db/database.module';
import { SeedService } from './seed/seed.service';
import { EncryptionService } from './encryption/encryption.service';

@Module({
    imports:[
        DatabaseModule,
        JwtModule.register({
            global: true,
            secret: process.env.PRIVATEKEY,
            signOptions: { expiresIn: '2h' },
          }),
    ],
    providers:[SeedService, EncryptionService],
    exports:[]
})
export class ServiceModule {}
