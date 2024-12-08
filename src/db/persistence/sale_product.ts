import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { SaleEntity } from "./sale.entity";
import { ProductEntity } from "./product.entity";


@Entity('SALE_PRODUCT')
export class SaleProductEntity extends BaseEntity{

    @PrimaryGeneratedColumn({name:'SALE_PRODUCT_ID'})
    saleProductId:number;
    
    @Column({name:'SALE_ID'})
    sale:SaleEntity;

    @Column({name:'PRODUCT_ID'})
    product:ProductEntity;
    

}