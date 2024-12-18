import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiQuery, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserEntity } from 'src/db/persistence/user.entity';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { Authorization } from 'src/decorators/auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { CreateClientDTO } from 'src/dto/create-client.dto';
import { ClientsService } from 'src/services/clients/clients.service';

@Controller('api/v1/clients')
export class ClientsController {

    constructor(private readonly clientsService: ClientsService) { }

    @ApiOperation({ summary: 'Get clients' })
    @ApiCreatedResponse({ description: 'Client list' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiUnauthorizedResponse({description:'Token invalid, token expired, token not provided, permission dennied'})
    @ApiBearerAuth()
    @ApiQuery({name:"limit",required:false, default:0,type:Number})
    @ApiQuery({name:"offset",required:false, default:0,type:Number})
    @Authorization()
    @Roles("CLIENTS_ADMIN_ROLE", "CLIENTS_USER_ROLE","SALES_ADMIN_ROLE", "SALES_USER_ROLE")
    @Get()
    async getClients(@Query("limit") limit: number, @Query("offset") offset: number) {
        return await this.clientsService.getClients(limit, offset);
    }

    @ApiOperation({ summary: 'Create new client' })
    @ApiCreatedResponse({ description: 'Client created' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiUnauthorizedResponse({description:'Token invalid, token expired, token not provided, permission dennied'})
    @ApiBody({ type: CreateClientDTO })
    @ApiBearerAuth()
    @Authorization()
    @Roles("CLIENTS_ADMIN_ROLE", "CLIENTS_USER_ROLE")
    @Post()
    async createClient(@Body() clientDTO: CreateClientDTO, @AuthUser() currentUser: UserEntity) {
        return await this.clientsService.createCliet(clientDTO, currentUser);
    }

    @ApiOperation({ summary: 'Update clients' })
    @ApiCreatedResponse({ description: 'Client updated' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiUnauthorizedResponse({description:'Token invalid, token expired, token not provided, permission dennied'})
    @ApiBearerAuth()
    @ApiBody({type:CreateClientDTO})
    @ApiParam({name:"id",required:true,type:Number})
    @Authorization()
    @Roles("CLIENTS_ADMIN_ROLE")
    @Put(":id")
    async updateClient(@Param("id", new ParseIntPipe()) id: number,
        @Body() clientDTO: CreateClientDTO,
        @AuthUser() currentUser: UserEntity) {
        return await this.clientsService.updateClient(id, clientDTO, currentUser);
    }

    @ApiOperation({ summary: 'Delete clients' })
    @ApiCreatedResponse({ description: 'Clients' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiUnauthorizedResponse({description:'Token invalid, token expired, token not provided, permission dennied'})
    @ApiBearerAuth()
    @ApiParam({name:"id",required:true,type:Number})
    @Authorization()
    @Roles("CLIENTS_ADMIN_ROLE")
    @Delete(":id")
    async deleteClient(@Param("id", new ParseIntPipe()) id: number,
        @AuthUser() currentUser: UserEntity) {
        return await this.clientsService.deleteClient(id, currentUser);
    }




}
