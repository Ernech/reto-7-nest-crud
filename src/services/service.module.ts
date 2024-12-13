import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { DatabaseModule } from 'src/db/database.module';
import { SeedService } from './seed/seed.service';
import { EncryptionService } from './encryption/encryption.service';
import { UserService } from './user/user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/passport/jwt.strategy';
import { ClientsService } from './clients/clients.service';
import { ProductsService } from './products/products.service';

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
    providers:[SeedService, EncryptionService, UserService,JwtService,JwtStrategy, ClientsService, ProductsService],
    exports:[UserService,JwtService,ClientsService, ProductsService]
})
export class ServiceModule {}
