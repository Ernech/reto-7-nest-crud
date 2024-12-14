import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProductEntity } from 'src/db/persistence/product.entity';
import { UserEntity } from 'src/db/persistence/user.entity';
import { ProductDTO } from 'src/dto/product.dto';
import { RepositoryEnum } from 'src/enums/repositories.enum';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

    constructor(@Inject(RepositoryEnum.PRODUCT) private readonly productRepository:Repository<ProductEntity>){}

    async createProduct(productDTO:ProductDTO, currentUser:UserEntity){
        try {
            const product = this.productRepository.create({...productDTO,createdBy:currentUser.id, updatedBy:currentUser.id});
            return await this.productRepository.save(product);
        } catch (error) {
            throw new InternalServerErrorException("Ocurrió un error");
        }
    }

    
    async updateProduct(productId:number,productDTO:ProductDTO, currentUser:UserEntity){
        try {
            const product = await this.productRepository.findOneBy({id:productId,status:1});
            if(!product){
                throw new NotFoundException('Producto no encontrado');
            }
            if(!product.available){
                throw new NotFoundException('El producto no se encuentra disponible');
            }
            product.productName=productDTO.productName;
            product.productDescription=productDTO.productDescription;
            product.productPrice=productDTO.productPrice;
            product.productStock=productDTO.productStock;
            product.updatedBy=currentUser.id;
            return await this.productRepository.save(product);
        } catch (error) {
            throw new InternalServerErrorException("Ocurrió un error");
        }
    }

    async deleteProduct(productId:number, currentUser:UserEntity){
        try {
            const product = await this.productRepository.findOneBy({id:productId,status:1});
            if(!product){
                throw new NotFoundException('Producto no encontrado');
            }
            product.status = 2;
            product.updatedBy = currentUser.id;
            await this.productRepository.save(product);
            return {msg: `El producto ${product.productName} fue eliminado`}
        } catch (error) {
            throw new InternalServerErrorException("Ocurrió un error");
        }
    }

    async changeAviability(productId:number, currentUser:UserEntity){
        try {
            const product = await this.productRepository.findOneBy({id:productId,status:1});
            if(!product){
                throw new NotFoundException('Producto no encontrado');
            }
            product.available = !product.available;
            product.updatedBy = currentUser.id;
            await this.productRepository.save(product)
            return {msg: `La disponibilidad del producto ${product.productName} fue modificada`}
        } catch (error) {
            throw new InternalServerErrorException("Ocurrió un error");
        }
    }


    async findProducts(limit:number=0,offset:number=0,name:string=''){
        try {
            const query = this.productRepository.createQueryBuilder('PRODUCT')
            .where("PRODUCT.STATUS =1")
            .skip(offset)
            .take(limit)
            if(name && name!==''){
                query.andWhere('UPPER(PRODUCT.PRODUCT_NAME) LIKE :name',{name:`%${name.toUpperCase()}%`})
            }
            return await query.getMany();
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("Ocurrió un error");
        }
    }
}
