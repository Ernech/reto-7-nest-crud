import { IsNotEmpty, IsString } from "class-validator";

export class CreateClientDTO{

    @IsString()
    @IsNotEmpty()
    clientName:string;

    @IsString()
    @IsNotEmpty()
    clientDescription:string;

}