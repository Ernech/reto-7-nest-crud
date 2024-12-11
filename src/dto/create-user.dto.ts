import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateUserDTO{

    @IsString()
    @IsNotEmpty()
    userName: string;
    
    @IsString()
    @IsNotEmpty()
    password:string;

    @IsNumber()
    @IsNotEmpty()
    departmentId:number;

    @IsNumber()
    @IsNotEmpty()
    roleId:number;
}