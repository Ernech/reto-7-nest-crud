import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base-entity";
import { SaleProductEntity } from "./sale_product.entity";
import { ClientEntity } from "./client.entity";


@Entity('SALE')
export class SaleEntity extends BaseEntity{


    @Column({name:'SALE_NUMBER'})
    saleNumber:number;

    @Column({name:'SALE_DATE',
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP'})
    saleDate:Date;

    @OneToMany(()=>SaleProductEntity,(saleProduct)=>saleProduct.sale)
    saleProduct:SaleProductEntity;

    @ManyToOne(()=>ClientEntity,(client)=>client.sales)
    @JoinColumn({name:'CLIENT_ID'})
    client:ClientEntity;

}