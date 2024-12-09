import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { ClientEntity } from "./client.entity";
import { SaleEntity } from "./sale.entity";
import { BaseEntity } from "./base-entity";


@Entity('CLIENT_SALE')
export class ClientSaleEntity extends BaseEntity{

    @ManyToOne(()=>ClientEntity,(client)=>client.clientSale,{cascade:true})
    @JoinColumn({name:'CLIENT_ID'})
    client:ClientEntity;

    @ManyToOne(()=>SaleEntity,(sale)=>sale.clientSale,{cascade:true})
    @JoinColumn({name:'SALE_ID'})
    sale:SaleEntity;

}