import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('SALE_PRODUCT')
export class SaleProduct extends BaseEntity{

    @PrimaryGeneratedColumn({name:'SALE_PRODUCT_ID'})
    saleProductId:number;
    
    @Column({name:'SALE_ID'})
    saleId:number;

    @Column({name:'PRODUCT_ID'})
    productId:number;
    

}