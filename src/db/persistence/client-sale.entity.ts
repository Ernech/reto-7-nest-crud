import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ClientEntity } from "./client.entity";
import { SaleEntity } from "./sale.entity";


@Entity('CLIENT_SALE')
export class ClientSaleEntity extends BaseEntity{

    @PrimaryGeneratedColumn({name:'CLIENT_SALE_ID'})
    clientSaleId:number;

    @Column({name:'CLIENT_ID'})
    client:ClientEntity;

    @Column({name:'SALE_ID'})
    sale:SaleEntity;

}