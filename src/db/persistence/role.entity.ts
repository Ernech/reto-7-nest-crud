import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RoleEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    roleId:number;

    @Column()
    roleName:string;



}