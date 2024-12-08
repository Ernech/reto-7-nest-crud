import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class ProductEntity extends BaseEntity{

    @PrimaryGeneratedColumn({name:'PRODUCT_ID'})
    productId:number;

    @Column({name:'PRODUCT_NAME',length:500})
    productName:string;

    @Column({name:'PRODUCT_STOCK'})
    productStock:number

    @Column({name:'PRODUCT_PRICE',type: 'numeric', precision: 10, scale: 2 })
    productPrice:number;




}