import { Entity, JoinColumn } from "typeorm";
import { ClientEntity } from "./client.entity";
import { SaleEntity } from "./sale.entity";
import { BaseEntity } from "./base-entity";


@Entity('CLIENT_SALE')
export class ClientSaleEntity extends BaseEntity{

    @JoinColumn({name:'CLIENT_ID'})
    client:ClientEntity;

    @JoinColumn({name:'SALE_ID'})
    sale:SaleEntity;

}