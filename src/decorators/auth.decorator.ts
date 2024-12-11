import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { TokenGuard } from 'src/guard/token.guard';


export const Authorization = () => applyDecorators(
  UseGuards(TokenGuard));