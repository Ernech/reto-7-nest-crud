import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiQuery, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserEntity } from 'src/db/persistence/user.entity';
import { AuthUser } from 'src/decorators/auth-user.decorator';
import { Authorization } from 'src/decorators/auth.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { ProductDTO } from 'src/dto/product.dto';
import { ProductsService } from 'src/services/products/products.service';

@Controller('api/v1/products')
export class ProductsController {

    constructor(private readonly productService: ProductsService) { }

    @ApiOperation({ summary: 'Create new product' })
    @ApiCreatedResponse({ description: 'Product created' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiUnauthorizedResponse({ description: 'Token invalid, token expired, token not provided, permission dennied' })
    @ApiBearerAuth()
    @ApiBody({ type: ProductDTO })
    @Authorization()
    @Roles("WAREHOUSE_ADMIN_ROLE", "WAREHOUSE_USER_ROLE")
    @Post()
    async createProduct(@Body() productDTO: ProductDTO, @AuthUser() currentUser: UserEntity) {
        return await this.productService.createProduct(productDTO, currentUser);
    }

    @ApiOperation({ summary: 'Get products' })
    @ApiCreatedResponse({ description: 'Products list' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiUnauthorizedResponse({ description: 'Token invalid, token expired, token not provided, permission dennied' })
    @ApiBearerAuth()
    @ApiQuery({ name: "limit", required: false, default: 0, type: Number })
    @ApiQuery({ name: "offset", required: false, default: 0, type: Number })
    @ApiQuery({ name: "name", required: false, default: '', type: String })
    @Authorization()
    @Roles("WAREHOUSE_ADMIN_ROLE", "WAREHOUSE_USER_ROLE", "CLIENTS_ADMIN_ROLE", "CLIENTS_USER_ROLE")
    @Get()
    async findAllProducts(@Query("limit") limit: number,
        @Query("offset") offset: number,
        @Query("name") name: string) {
        return await this.productService.findProducts(limit, offset, name);
    }

    @ApiOperation({ summary: 'Update products' })
    @ApiCreatedResponse({ description: 'Product updated' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiUnauthorizedResponse({ description: 'Token invalid, token expired, token not provided, permission dennied' })
    @ApiBearerAuth()
    @ApiParam({name:'id',required:true,type:Number})
    @ApiBody({type:ProductDTO})
    @Authorization()
    @Roles("WAREHOUSE_ADMIN_ROLE", "WAREHOUSE_USER_ROLE")
    @Put(":id")
    async editProduct(@Param("id", new ParseIntPipe()) id: number,
        @Body() productDTO: ProductDTO,
        @AuthUser() currentUser: UserEntity) {
        return await this.productService.updateProduct(id, productDTO, currentUser);
    }

    @ApiOperation({ summary: 'Delete products' })
    @ApiCreatedResponse({ description: 'Product deleted message' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiUnauthorizedResponse({ description: 'Token invalid, token expired, token not provided, permission dennied' })
    @ApiBearerAuth()
    @ApiParam({name:'id',required:true,type:Number})
    @Authorization()
    @Roles("WAREHOUSE_ADMIN_ROLE")
    @Delete(":id")
    async deleteProduct(@Param("id", new ParseIntPipe()) id: number,
        @AuthUser() currentUser: UserEntity) {
        return await this.productService.deleteProduct(id, currentUser);
    }

    @ApiOperation({ summary: 'Change products aviability' })
    @ApiCreatedResponse({ description: 'Product aviability success message' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiUnauthorizedResponse({ description: 'Token invalid, token expired, token not provided, permission dennied' })
    @ApiBearerAuth()
    @ApiParam({name:'id',required:true,type:Number})
    @Authorization()
    @Authorization()
    @Roles("WAREHOUSE_ADMIN_ROLE")
    @Patch(":id")
    async changeAviability(@Param("id", new ParseIntPipe()) id: number,
        @AuthUser() currentUser: UserEntity) {
        return await this.productService.changeAviability(id, currentUser);
    }





}
