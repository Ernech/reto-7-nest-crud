import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { RoleEntity } from "./role.entity";
import { DepartmentEntity } from "./department.entity";
import { BaseEntity } from "./base-entity";
import { DependenciesScanner } from "@nestjs/core/scanner";


@Entity('USERS')
export class UserEntity extends BaseEntity{


    @Column({name:'USER_NAME',length:500})
    userName:string;

    @Column({name:'PASSWORD',length:500})
    password:string

    @ManyToOne(()=>RoleEntity,(role)=>role.users,{cascade:true})
    @JoinColumn({name:'ROLE_ID'})
    role:RoleEntity;
}