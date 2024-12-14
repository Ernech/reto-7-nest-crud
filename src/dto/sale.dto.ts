import { ArrayMinSize, isNotEmpty, IsNumber, Min } from "class-validator";


export class SaleDTO{

    @IsNumber()
    @Min(0)
    saleNumber:number;

    @IsNumber()
    @Min(0)
    clientId:number;

    @ArrayMinSize(1)
    products:ProductSaleDTO[];


}

export class ProductSaleDTO{

    @IsNumber()
    @Min(0)
    productId:number;

    @IsNumber()
    @Min(0)
    quantity:number;


}