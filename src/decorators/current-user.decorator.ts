import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const Auth = () => applyDecorators(UseGuards(AuthGuard));
