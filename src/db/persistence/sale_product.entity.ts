import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { SaleEntity } from "./sale.entity";
import { ProductEntity } from "./product.entity";
import { BaseEntity } from "./base-entity";


@Entity('SALE_PRODUCT')
export class SaleProductEntity extends BaseEntity{
    
    @ManyToOne(()=>SaleEntity,(sale)=>sale.saleProduct,{cascade:true})
    @JoinColumn({name:'SALE_ID'})
    sale:SaleEntity;

    @ManyToOne(()=>ProductEntity,(product)=>product.saleProduct,{cascade:true})
    @JoinColumn({name:'PRODUCT_ID'})
    product:ProductEntity;

    @Column({name:"QUANTITY"})
    quantity:number;
    
    @Column({name:"SALE_PRICE",type: 'numeric', precision: 10, scale: 2})
    salePrice:number;

}