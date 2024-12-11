import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
@Injectable()
export class TokenGuard implements CanActivate {

  constructor(private reflector:Reflector, private tokenService: JwtService){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {


    const authRequired = this.reflector.get<string[]>(
      'authorizationRequired',
      context.getHandler(),
    );

   const request = context.switchToHttp().getRequest()
   const authorizationHeader = request.headers.authorization;

   if(!authorizationHeader){
      if(!authRequired){
        return true;
      }
      throw new UnauthorizedException('No puede acceder a este recruso')
   }
   const auth = authorizationHeader ? authorizationHeader.split(' ') : null;
   if(auth && auth.length===2 && auth[0] === 'Bearer'){
      try {
        
        const validateToken = this.tokenService.verify(auth[1],{ secret: process.env.PRIVATEKEY })
        if(validateToken){
          return true
        }
      } catch (error) {
        throw new UnauthorizedException('Token inválido o expirado')
      }
   }
  }
}