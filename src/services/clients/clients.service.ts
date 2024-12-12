import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ClientEntity } from 'src/db/persistence/client.entity';
import { UserEntity } from 'src/db/persistence/user.entity';
import { CreateClientDTO } from 'src/dto/create-client.dto';
import { RepositoryEnum } from 'src/enums/repositories.enum';
import { Repository } from 'typeorm';

@Injectable()
export class ClientsService {

    constructor(
        @Inject(RepositoryEnum.CLIENT) private readonly clientsRepository:Repository<ClientEntity>
    ){}

    async createCliet(clientDTO:CreateClientDTO, currentUser:UserEntity){
        try {
            const client = this.clientsRepository.create({...clientDTO, createdBy:currentUser.id, updatedBy:currentUser.id});
            return await this.clientsRepository.save(client);

        } catch (error) {
            throw new InternalServerErrorException("Ocurrió un error");
        }
    }

    async updateClient(clientId:number,clientDTO:CreateClientDTO,currentUser:UserEntity){
        try {
            const client = await this.clientsRepository.findOneBy({id:clientId,status:1});
            if(!client) throw new NotFoundException("Cliente no encontrado");
            client.clientName=clientDTO.clientName;
            client.clientDescription=clientDTO.clientDescription;
            client.updatedBy=currentUser.id;
            return await this.clientsRepository.save(client);
        } catch (error) {
            throw new InternalServerErrorException("Ocurrió un error");
        }

    }

    async deleteClient(clientId:number,currentUser:UserEntity){
        try {
            const client = await this.clientsRepository.findOneBy({id:clientId,status:1});
            if(!client) throw new NotFoundException("Cliente no encontrado");
            client.status=2;
            client.updatedBy=currentUser.id;
            return await this.clientsRepository.save(client);
        } catch (error) {
            throw new InternalServerErrorException("Ocurrió un error");
        }
    }

    async getClients(limit:number, offset:number){
        try {
            const clients =  this.clientsRepository.createQueryBuilder("CLIENT").select()
            .where("CLIENT.STATUS=1")
            .take(limit)
            .skip(offset);
            return await clients.getMany();
        } catch (error) {
            throw new InternalServerErrorException("Ocurrió un error");
        }
    }


}
