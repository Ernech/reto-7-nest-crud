import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base-entity";
import { SaleEntity } from "./sale.entity";


@Entity('CLIENT')
export class ClientEntity extends BaseEntity{

    @Column({name:'CLIENT_NAME',length:250})
    clientName:string;

    @Column({name:'CLIENT_DESCRIPTION'})
    clientDescription:string;

    @OneToMany(()=>SaleEntity,(sale)=>sale.client,{cascade:true})
    sales:SaleEntity[];

}