import {applyDecorators, SetMetadata, UseGuards} from '@nestjs/common'
import { RoleGuard } from 'src/guard/role.guard';

export const Roles = (...roles: string[]) => 
    applyDecorators(SetMetadata('roles',roles),
    UseGuards(RoleGuard));