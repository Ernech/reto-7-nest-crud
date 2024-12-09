import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base-entity";
import { UserEntity } from "./user.entity";
import { RoleEntity } from "./role.entity";


@Entity('DEPARTAMENT')
export class DepartmentEntity extends BaseEntity{


    @Column({name:'DEPARTAMENT_NAME'})
    departamentName:string;

    @OneToMany(()=>RoleEntity,(role)=>role.department)
    roles:RoleEntity[];


}