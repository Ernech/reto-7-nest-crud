import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base-entity";
import { ClientSaleEntity } from "./client-sale.entity";
import { SaleProductEntity } from "./sale_product.entity";


@Entity('SALE')
export class SaleEntity extends BaseEntity{


    @Column({name:'SALE_NUMBER'})
    saleNumber:number;

    @Column({name:'SALE_DATE',
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP'})
    saleDate:Date;

    @OneToMany(()=>ClientSaleEntity,(clientSale)=>clientSale.sale)
    clientSale:ClientSaleEntity;

    @OneToMany(()=>SaleProductEntity,(saleProduct)=>saleProduct.sale)
    saleProduct:SaleProductEntity;

}