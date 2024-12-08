import { Entity, JoinColumn } from "typeorm";
import { SaleEntity } from "./sale.entity";
import { ProductEntity } from "./product.entity";
import { BaseEntity } from "./base-entity";


@Entity('SALE_PRODUCT')
export class SaleProductEntity extends BaseEntity{
    
    @JoinColumn({name:'SALE_ID'})
    sale:SaleEntity;

    @JoinColumn({name:'PRODUCT_ID'})
    product:ProductEntity;
    

}