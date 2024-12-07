import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RoleEntity } from "./role.entity";
import { DepartmentEntity } from "./department.entity";


@Entity('ROLE_DEPARTMENT')
export class RoleDepartment extends BaseEntity{

    @PrimaryGeneratedColumn({name:'ROLE_DEPARTMENT_ID'})
    roleDepartmentId:number;

    @Column({name:'ROLE_ID'})
    role:RoleEntity;

    @Column({name:'DEPARTMENT_ID'})
    department:DepartmentEntity;


}