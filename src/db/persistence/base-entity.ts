import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";


@Entity()
export class BaseEntity{

    @PrimaryGeneratedColumn({name:'ID'})
    id:number;

    @Column({name:'STATUS',default:1})
    status: number;

    @Column({name:'CREATED_BY', default:0})
    createdBy:number;

    @CreateDateColumn({
        name: 'CREATED_AT',
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP'
    })


    @Column({name:'UPDATED_BY', default:0})
    updatedBy:number;

    createdAt: Date;
    @CreateDateColumn({
        name: 'UPDATED_AT',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate:'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;
} 