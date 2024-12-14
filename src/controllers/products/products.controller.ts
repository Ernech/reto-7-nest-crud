import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { UserEntity } from 'src/db/persistence/user.entity';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { Authorization } from 'src/decorators/auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { ProductDTO } from 'src/dto/product.dto';
import { ProductsService } from 'src/services/products/products.service';

@Controller('api/v1/products')
export class ProductsController {

    constructor(private readonly productService:ProductsService){}

    @Authorization()
    @Roles("WAREHOUSE_ADMIN_ROLE","WAREHOUSE_USER_ROLE")
    @Post()
    async createProduct(@Body() productDTO:ProductDTO, @AuthUser() currentUser:UserEntity){
        return await this.productService.createProduct(productDTO,currentUser);
    }

    @Authorization()
    @Roles("WAREHOUSE_ADMIN_ROLE","WAREHOUSE_USER_ROLE","CLIENTS_ADMIN_ROLE","CLIENTS_USER_ROLE")
    @Get()
    async findAllProducts(@Query("limit") limit:number, 
                          @Query("offset") offset:number,
                          @Query("name") name:string){
        return await this.productService.findProducts(limit,offset,name);
    }

    @Authorization()
    @Roles("WAREHOUSE_ADMIN_ROLE","WAREHOUSE_USER_ROLE")
    @Put(":id")
    async editProduct(@Param("id", new ParseIntPipe()) id:number, 
                      @Body() productDTO:ProductDTO, 
                      @AuthUser() currentUser:UserEntity){
        return await this.productService.updateProduct(id,productDTO,currentUser);
    }

    @Authorization()
    @Roles("WAREHOUSE_ADMIN_ROLE")
    @Delete(":id")
    async deleteProduct(@Param("id", new ParseIntPipe()) id:number,
                        @AuthUser() currentUser:UserEntity){
        return await this.productService.deleteProduct(id,currentUser);
    }

    @Authorization()
    @Roles("WAREHOUSE_ADMIN_ROLE")
    @Patch(":id")
    async changeAviability(@Param("id", new ParseIntPipe()) id:number,
                           @AuthUser() currentUser:UserEntity){
        return await this.productService.changeAviability(id,currentUser);
    }


    


}
