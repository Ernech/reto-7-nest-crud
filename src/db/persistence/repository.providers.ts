import { DataSource } from "typeorm";
import { ProductEntity } from "./product.entity";
import { RepositoryEnum } from "src/enums/repositories.enum";
import { ClientEntity } from "./client.entity";
import { DepartmentEntity } from "./department.entity";
import { RoleEntity } from "./role.entity";
import { SaleProductEntity } from "./sale_product.entity";
import { SaleEntity } from "./sale.entity";
import { UserEntity } from "./user.entity";



export const repositoryProviders = [
    {
        provide: RepositoryEnum.CLIENT,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ClientEntity),
        inject: [DataSource], 
    },

    {
        provide: RepositoryEnum.PRODUCT,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductEntity),
        inject: [DataSource],
    },
    {
        provide: RepositoryEnum.DEPARTMENT,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(DepartmentEntity),
        inject: [DataSource],
    },
    {
        provide: RepositoryEnum.ROLE,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(RoleEntity),
        inject: [DataSource],
    },
    {
        provide: RepositoryEnum.SALE_PRODUCT,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(SaleProductEntity),
        inject: [DataSource],
    },
    {
        provide: RepositoryEnum.SALE,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(SaleEntity),
        inject: [DataSource],
    },
    {
        provide: RepositoryEnum.USER,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
        inject: [DataSource],
    },
] 