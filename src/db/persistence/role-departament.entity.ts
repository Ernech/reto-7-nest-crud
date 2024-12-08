import { Entity, JoinColumn } from "typeorm";
import { RoleEntity } from "./role.entity";
import { DepartmentEntity } from "./department.entity";
import { BaseEntity } from "./base-entity";


@Entity('ROLE_DEPARTMENT')
export class RoleDepartmentEntity extends BaseEntity{

    @JoinColumn({name:'ROLE_ID',})
    role:RoleEntity;

    @JoinColumn({name:'DEPARTMENT_ID'})
    department:DepartmentEntity;


}