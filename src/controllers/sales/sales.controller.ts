import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserEntity } from 'src/db/persistence/user.entity';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { Authorization } from 'src/decorators/auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { SaleDTO } from 'src/dto/sale.dto';
import { SalesService } from 'src/services/sales/sales.service';

@Controller('api/v1/sales')
export class SalesController {

    constructor(private readonly salesService: SalesService) { }

    @ApiOperation({ summary: 'Create new sale' })
    @ApiCreatedResponse({ description: 'Sale created' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiUnauthorizedResponse({ description: 'Token invalid, token expired, token not provided, permission dennied' })
    @ApiBearerAuth()
    @ApiBody({type:SaleDTO})
    @Authorization()
    @Roles("SALES_ADMIN_ROLE", "SALES_USER_ROLE")
    @Post()
    async registerNewSale(@Body() saleDTO: SaleDTO, @AuthUser() currentUser: UserEntity) {
        return await this.salesService.createSale(saleDTO, currentUser);
    }

    @ApiOperation({ summary: 'Get sales by client id' })
    @ApiCreatedResponse({ description: 'Sales found' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiUnauthorizedResponse({ description: 'Token invalid, token expired, token not provided, permission dennied' })
    @ApiBearerAuth()
    @ApiParam({name:'id',required:true,type:Number})
    @Authorization()
    @Roles("SALES_ADMIN_ROLE", "CLIENTS_ADMIN_ROLE")
    @Get("/client/:id")
    async getClientSale(@Param('id', new ParseIntPipe()) id: number) {
        return await this.salesService.getSalesByClientId(id);
    }

    @ApiOperation({ summary: 'Delete sale' })
    @ApiCreatedResponse({ description: 'Sale deleted success message' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiUnauthorizedResponse({ description: 'Token invalid, token expired, token not provided, permission dennied' })
    @ApiBearerAuth()
    @ApiParam({name:'id',required:true,type:Number})
    @Authorization()
    @Roles("SALES_ADMIN_ROLE")
    @Delete(":id")
    async deleteSale(@Param('id', new ParseIntPipe()) id: number, @AuthUser() currenUser: UserEntity) {
        return await this.salesService.deleteSale(id, currenUser);
    }


}
