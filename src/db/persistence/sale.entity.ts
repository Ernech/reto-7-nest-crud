import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base-entity";


@Entity('SALE')
export class SaleEntity extends BaseEntity{


    @Column({name:'SALE_NUMBER'})
    saleNumber:number;

    @Column({name:'SALE_DATE',
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP'})
    saleDate:Date;

    

}