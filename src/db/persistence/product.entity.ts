import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base-entity";
import { SaleProductEntity } from "./sale_product.entity";


@Entity({name:'PRODUCT'})
export class ProductEntity extends BaseEntity{


    @Column({name:'PRODUCT_NAME',length:500})
    productName:string;

    @Column({name:'PRODUCT_STOCK'})
    productStock:number

    @Column({name:'PRODUCT_PRICE',type: 'numeric', precision: 10, scale: 2 })
    productPrice:number;

    @OneToMany(()=>SaleProductEntity,(saleProduct)=>saleProduct.product)
    saleProduct:SaleProductEntity[]

}