import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('DEPARTAMENT')
export class DepartmentEntity extends BaseEntity{

    @PrimaryGeneratedColumn({name:'DEPARTMENT_ID'})
    departmentId:number

    @Column({name:'DEPARTAMENT_NAME'})
    departamentName:string;


}