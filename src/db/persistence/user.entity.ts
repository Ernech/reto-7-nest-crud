import { Column, Entity, JoinColumn } from "typeorm";
import { RoleEntity } from "./role.entity";
import { DepartmentEntity } from "./department.entity";
import { BaseEntity } from "./base-entity";


@Entity('USERS')
export class UserEntity extends BaseEntity{


    @Column({name:'USER_NAME',length:500})
    userName:string;

    @Column({name:'PASSWORD',length:500})
    password:string

    @JoinColumn({name:'DEPARTMENT_ID'})
    department:DepartmentEntity

    @JoinColumn({name:'ROLE_ID'})
    role:RoleEntity;
}