import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class TokenGuard extends AuthGuard('jwt') {
  
  handleRequest(err: any, user: any, info: any, context: any) {
    if (err || !user) {

      if (info?.name === 'TokenExpiredError') {
        throw new UnauthorizedException('El token ha expirado, por favor inicia sesión nuevamente.');
      } else if (info?.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('El token no es válido, por favor verifica tu credencial.');
      } else {
        throw new UnauthorizedException('No autorizado.');
      }
    }
    return user;
  }
}