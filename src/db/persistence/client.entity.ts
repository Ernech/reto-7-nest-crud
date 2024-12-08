import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('CLIENT')
export class ClientEntity extends BaseEntity{


    @PrimaryGeneratedColumn({name:'CLIENT_ID'})
    clientId:number;

    @Column('CLIENT_NAME')
    clientName:string;


}