import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private readonly _reflector: Reflector, private tokenService: JwtService) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this._reflector.getAllAndOverride<string>('roles', [context.getHandler(), context.getClass()])

    if (!roles) {
      return true
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('No tiene permiso para accedera este recurso')
    }

    const decodedToken = this.tokenService.verify(token)
    const role = decodedToken.role || null;
    const hasRole = () => roles.includes(role)
    return hasRole()
  }
}