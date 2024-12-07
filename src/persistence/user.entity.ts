import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RoleEntity } from "./role.entity";
import { DepartmentEntity } from "./department.entity";


@Entity()
export class UserEntity extends BaseEntity{

    @PrimaryGeneratedColumn({name:'USER_ID'})
    userId:number;

    @Column({name:'USER_NAME',length:500})
    userName:string;

    @Column({name:'PASSWORD',length:500})
    password:string

    @Column({name:'DEPARTMENT'})
    department:DepartmentEntity

    @Column({name:'ROLE'})
    role:RoleEntity;
}