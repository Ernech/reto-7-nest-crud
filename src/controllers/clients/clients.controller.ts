import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { UserEntity } from 'src/db/persistence/user.entity';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { Authorization } from 'src/decorators/auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { CreateClientDTO } from 'src/dto/create-client.dto';
import { ClientsService } from 'src/services/clients/clients.service';

@Controller('api/v1/clients')
export class ClientsController {

    constructor(private readonly clientsService:ClientsService){}


    @Authorization()
    @Roles("CLIENTS_ADMIN_ROLE","CLIENTS_USER_ROLE")
    @Get()
    async getClients(@Query("limit") limit:number, @Query("offset") offset:number){
        return await this.clientsService.getClients(limit,offset);
    }

    @Authorization()
    @Roles("CLIENTS_ADMIN_ROLE","CLIENTS_USER_ROLE")
    @Post()
    async createClient(@Body() clientDTO:CreateClientDTO, @AuthUser() currentUser:UserEntity){
        return await this.clientsService.createCliet(clientDTO,currentUser);
    }

    @Authorization()
    @Roles("CLIENTS_ADMIN_ROLE")
    @Put(":id")
    async updateClient(@Param("id",new ParseIntPipe()) id:number,
                        @Body() clientDTO:CreateClientDTO,
                        @AuthUser() currentUser:UserEntity){
        return await this.clientsService.updateClient(id,clientDTO,currentUser);
    }

    @Authorization()
    @Roles("CLIENTS_ADMIN_ROLE")
    @Delete(":id")
    async deleteClient(@Param("id",new ParseIntPipe()) id:number, 
    @AuthUser() currentUser:UserEntity){
        return await this.clientsService.deleteClient(id,currentUser);
    }

    


}
