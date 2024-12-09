import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base-entity";
import { ClientSaleEntity } from "./client-sale.entity";


@Entity('CLIENT')
export class ClientEntity extends BaseEntity{

    @Column({name:'CLIENT_NAME'})
    clientName:string;

    @OneToMany(()=>ClientSaleEntity,(clientSale)=>clientSale.client)
    clientSale:ClientSaleEntity[];


}