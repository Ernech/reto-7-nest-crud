import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base-entity";


@Entity('CLIENT')
export class ClientEntity extends BaseEntity{



    @Column({name:'CLIENT_NAME'})
    clientName:string;


}