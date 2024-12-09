import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base-entity";
import { SaleEntity } from "./sale.entity";


@Entity('CLIENT')
export class ClientEntity extends BaseEntity{

    @Column({name:'CLIENT_NAME'})
    clientName:string;

    @OneToMany(()=>SaleEntity,(sale)=>sale.client,{cascade:true})
    sales:SaleEntity[];

}