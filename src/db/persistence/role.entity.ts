import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base-entity";

@Entity('ROLE')
export class RoleEntity extends BaseEntity{


    @Column({name:'ROLE_NAME'})
    roleName:string;



}