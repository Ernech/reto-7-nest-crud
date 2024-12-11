import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const AuthUser = () => applyDecorators(UseGuards(AuthGuard('jwt')));
