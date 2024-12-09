import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base-entity";
import { UserEntity } from "./user.entity";
import { DepartmentEntity } from "./department.entity";

@Entity('ROLE')
export class RoleEntity extends BaseEntity{


    @Column({name:'ROLE_NAME'})
    roleName:string;

    @OneToMany(()=>UserEntity,(user)=>user.role)
    users:UserEntity[];
    
    @ManyToOne(()=>DepartmentEntity,(department)=>department.roles,{cascade:true})
    @JoinColumn({name:'DEPARTMENT_ID'})
    department:DepartmentEntity
    


}