import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";



export class SaleEntity extends BaseEntity{

    @PrimaryGeneratedColumn({name:'SALE_ID'})
    saleId:number;

    @Column({name:'SALE_DATE',
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP'})
    saleDate:Date;

    

}