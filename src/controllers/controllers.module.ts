import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/services/service.module';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { ClientsController } from './clients/clients.controller';
import { ProductsController } from './products/products.controller';
import { SalesController } from './sales/sales.controller';

@Module({
    imports:[ServiceModule],
    controllers:[UserController, AuthController, ClientsController, ProductsController, SalesController]
})
export class ControllersModule {}
