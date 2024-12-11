import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PayloadInterface } from 'src/interfaces/payload.interface';
import { UserService } from 'src/services/user/user.service';
import { UserEntity } from 'src/db/persistence/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService, private readonly userService:UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('PRIVATEKEY'), 
    });
  }

  async validate(payload: PayloadInterface):Promise<UserEntity> {
    const user = await this.userService.findUserById(payload.id)
    if(user){
        return user; 
    }
    throw new NotFoundException('No se encontró al usuario dueño del token');
  }
}
