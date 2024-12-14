import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ClientEntity } from 'src/db/persistence/client.entity';
import { ProductEntity } from 'src/db/persistence/product.entity';
import { SaleEntity } from 'src/db/persistence/sale.entity';
import { SaleProductEntity } from 'src/db/persistence/sale_product.entity';
import { UserEntity } from 'src/db/persistence/user.entity';
import { SaleDTO } from 'src/dto/sale.dto';
import { RepositoryEnum } from 'src/enums/repositories.enum';
import { Repository,DataSource } from 'typeorm';

@Injectable()
export class SalesService {

    constructor(@Inject(RepositoryEnum.SALE) private readonly saleRepository:Repository<SaleEntity>,
    @Inject(RepositoryEnum.SALE_PRODUCT) private readonly saleProductRepository:Repository<SaleProductEntity>,                
    @Inject(RepositoryEnum.CLIENT) private readonly clientRepository:Repository<ClientEntity>,   
    @Inject(RepositoryEnum.PRODUCT) private readonly productRepository:Repository<ProductEntity>, 
    private readonly dataSource:DataSource              
    ){}


    async createSale(saleDTO: SaleDTO, currentUser: UserEntity) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
    
        try {
            // 1. Validar cliente
            const client = await queryRunner.manager.findOneBy(ClientEntity, { id: saleDTO.clientId, status: 1 });
            if (!client) {
                throw new NotFoundException(`El cliente con id ${saleDTO.clientId} no fue encontrado`);
            }
    
            // 2. Validar y preparar productos
            const productPromises = saleDTO.products.map(async (productDTO) => {
                const product = await queryRunner.manager.findOneBy(ProductEntity, { id: productDTO.productId, status: 1 });
                if (!product) {
                    throw new NotFoundException(`El producto con id ${productDTO.productId} no fue encontrado`);
                }
                if (product.productStock <= 0 || !product.available) {
                    throw new BadRequestException(`El producto con id ${productDTO.productId} no está disponible`);
                }
                if (product.productStock < productDTO.quantity) {
                    throw new BadRequestException(`El producto con id ${productDTO.productId} tiene una cantidad insuficiente (${product.productStock})`);
                }
    
                product.productStock -= productDTO.quantity;
                product.updatedBy = currentUser.id;
    
                const saleProduct = this.saleProductRepository.create({
                    product,
                    quantity: productDTO.quantity,
                    salePrice: product.productPrice,
                });
    
                return { product, saleProduct };
            });
    
            const results = await Promise.all(productPromises);
            const productsToUpdate = results.map((res) => res.product);
            const saleProducts = results.map((res) => res.saleProduct);
    
            // 3. Guardar venta
            const newSale = this.saleRepository.create({
                saleNumber: saleDTO.saleNumber,
                client,
                createdBy: currentUser.id,
                updatedBy: currentUser.id,
            });
            const savedSale = await queryRunner.manager.save(newSale);
    
            // 4. Guardar productos de la venta
            for (const saleProduct of saleProducts) {
                saleProduct.sale = savedSale;
                saleProduct.createdBy = currentUser.id;
                saleProduct.updatedBy = currentUser.id;
    
                await queryRunner.manager.save(saleProduct);
            }
    
            // 5. Actualizar productos
            for (const product of productsToUpdate) {
                await queryRunner.manager.save(product);
            }
    
            // 6. Confirmar transacción
            await queryRunner.commitTransaction();
            return savedSale;
    
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error instanceof Error ? error : new InternalServerErrorException('Error al registrar la venta');
        } finally {
            await queryRunner.release();
        }
    }
    
    

}
