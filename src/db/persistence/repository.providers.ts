import { DataSource } from "typeorm";
import { ProductEntity } from "./product.entity";
import { RepositoryEnum } from "src/enums/repositories.enum";
import { ClientEntity } from "./client.entity";
import { ClientSaleEntity } from "./client-sale.entity";
import { DepartmentEntity } from "./department.entity";
import { RoleDepartmentEntity } from "./role-departament.entity";
import { RoleEntity } from "./role.entity";
import { SaleProductEntity } from "./sale_product.entity";
import { SaleEntity } from "./sale.entity";
import { UserEntity } from "./user.entity";



export const repositoryProviders = [
    {
        provide: RepositoryEnum.CLIENT,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ClientEntity),
        inject: ['DATA_SOURCE'], 
    },

    {
        provide: RepositoryEnum.PRODUCT,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ProductEntity),
        inject: ['DATA_SOURCE'],
    },

    {
        provide: RepositoryEnum.CLIENT_SALE,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ClientSaleEntity),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: RepositoryEnum.DEPARTMENT,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(DepartmentEntity),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: RepositoryEnum.ROLE_DEPARTMENT,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(RoleDepartmentEntity),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: RepositoryEnum.ROLE,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(RoleEntity),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: RepositoryEnum.SALE_PRODUCT,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(SaleProductEntity),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: RepositoryEnum.SALE,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(SaleEntity),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: RepositoryEnum.USER,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
        inject: ['DATA_SOURCE'],
    },
] 