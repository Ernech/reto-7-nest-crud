import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";


export class ProductDTO{


    @IsString()
    @IsNotEmpty()
    productName:string;

    @IsString()
    @IsNotEmpty()
    productDescription:string;

    @IsNumber()
    @Min(0)
    productStock:number;

    @IsNumber()
    @Min(0)
    productPrice:number;

    

}