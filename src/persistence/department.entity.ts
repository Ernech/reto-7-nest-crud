import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class DepartmentEntity extends BaseEntity{

    @PrimaryGeneratedColumn({name:'DEPARTMENT_ID'})
    departmentId:number


}