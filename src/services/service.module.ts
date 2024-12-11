import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { DatabaseModule } from 'src/db/database.module';
import { SeedService } from './seed/seed.service';
import { EncryptionService } from './encryption/encryption.service';
import { UserService } from './user/user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports:[
        DatabaseModule,
        PassportModule.register({defaultStrategy:'jwt'}),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
              secret: configService.get<string>('PRIVATEKEY'),
              signOptions: { expiresIn: '2h' },
            }),
          }),
    ],
    providers:[SeedService, EncryptionService, UserService,JwtService],
    exports:[UserService,JwtService]
})
export class ServiceModule {}
