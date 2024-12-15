import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserEntity } from 'src/db/persistence/user.entity';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { Authorization } from 'src/decorators/auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { SaleDTO } from 'src/dto/sale.dto';
import { SalesService } from 'src/services/sales/sales.service';

@Controller('api/v1/sales')
export class SalesController {

    constructor(private readonly salesService:SalesService){}

    @Authorization()
    @Roles("SALES_ADMIN_ROLE","SALES_USER_ROLE")
    @Post()
    async registerNewSale(@Body() saleDTO:SaleDTO, @AuthUser() currentUser:UserEntity){
        return await this.salesService.createSale(saleDTO,currentUser);
    }

    @Authorization()
    @Roles("SALES_ADMIN_ROLE","CLIENTS_ADMIN_ROLE")
    @Get("/client/:id")
    async getClientSale(@Param('id',new ParseIntPipe()) id:number){
        return await this.salesService.getSalesByClientId(id);
    }

    @Authorization()
    @Roles("SALES_ADMIN_ROLE")
    @Delete(":id")
    async deleteSale(@Param('id',new ParseIntPipe()) id:number, @AuthUser() currenUser:UserEntity){
        return await this.salesService.deleteSale(id,currenUser);
    }


}
