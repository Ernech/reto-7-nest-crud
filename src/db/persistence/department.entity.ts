import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base-entity";


@Entity('DEPARTAMENT')
export class DepartmentEntity extends BaseEntity{


    @Column({name:'DEPARTAMENT_NAME'})
    departamentName:string;


}