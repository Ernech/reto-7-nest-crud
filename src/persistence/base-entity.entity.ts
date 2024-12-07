import { Column, CreateDateColumn, Entity } from "typeorm";
import { UserEntity } from "./user.entity";


@Entity()
export class BaseEntity{

    @Column({name:'status',default:1})
    status: number;

    @Column({name:'CREATED_BY'})
    createdBy:UserEntity;

    @CreateDateColumn({
        name: 'CREATED_AT',
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP'
    })


    @Column({name:'UPDATED_BY'})
    updatedBy:UserEntity;

    createdAt: Date;
    @CreateDateColumn({
        name: 'UPDATED_AT',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate:'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;
} 