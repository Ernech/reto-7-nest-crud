import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DepartmentEntity } from 'src/db/persistence/department.entity';
import { RoleEntity } from 'src/db/persistence/role.entity';
import { UserEntity } from 'src/db/persistence/user.entity';
import { RepositoryEnum } from 'src/enums/repositories.enum';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService implements OnApplicationBootstrap{
    
    
     constructor(
        @Inject(RepositoryEnum.USER) private readonly UserRepository:Repository<UserEntity>,
        @Inject(RepositoryEnum.ROLE) private readonly RoleRepository:Repository<RoleEntity>,
        @Inject(RepositoryEnum.DEPARTMENT) private readonly DepartmentRepository:Repository<DepartmentEntity>
    ){}
    
    
    async onApplicationBootstrap() {
        const departments = await this.DepartmentRepository.find({where:{status:1}});
        if(!departments || departments.length==0){
            await this.CreateDepartments();
        }
        const roles = await this.RoleRepository.find({where:{status:1}});
        if(!roles || roles.length==0){
            await this.CreateRoles();
        }
        const user = await this.UserRepository.findOne({where:{status:1, userName:'ADMIN_ROLE'}});
        if(!user){
            await this.CreateSuperAdmin()
        }
    }


    private async CreateDepartments(){
        const adminDepartment = this.DepartmentRepository.create({
            departamentName:"ADMIN"

        });
        const warehouseDepartment = this.DepartmentRepository.create({
            departamentName:"WAREHOUSE"

        });
        const salesDepartment = this.DepartmentRepository.create({
            departamentName:"SALES"
            
        });

        const clientsDepartment = this.DepartmentRepository.create({
            departamentName:"CLIENTS"
            
        });
        await this.DepartmentRepository.save(adminDepartment);
        await this.DepartmentRepository.save(warehouseDepartment);
        await this.DepartmentRepository.save(salesDepartment);
        await this.DepartmentRepository.save(clientsDepartment);
    }

    private async CreateRoles(){
        const adminDepartment = await this.DepartmentRepository.findOne({where:{departamentName:'ADMIN'}});
        const warehouseDepartment = await this.DepartmentRepository.findOne({where:{departamentName:'WAREHOUSE'}});
        const salesDepartment = await this.DepartmentRepository.findOne({where:{departamentName:'SALES'}});
        const clientsDepartment = await this.DepartmentRepository.findOne({where:{departamentName:'CLIENTS'}});
        
        const superAdminRole= this.RoleRepository.create({roleName:'ADMIN_ROLE',department:adminDepartment});
        
        const warehouseAdminRole= this.RoleRepository.create({roleName:'WAREHOUSE_ADMIN_ROLE',department:warehouseDepartment});
        const warehouseUserRole= this.RoleRepository.create({roleName:'WAREHOUSE_USER_ROLE',department:warehouseDepartment});

        const salesAdminRole= this.RoleRepository.create({roleName:'SALES_ADMIN_ROLE',department:salesDepartment});
        const salesUserRole= this.RoleRepository.create({roleName:'SALES_USER_ROLE',department:salesDepartment});

        const clientsAdminRole= this.RoleRepository.create({roleName:'CLIENTS_ADMIN_ROLE',department:clientsDepartment});
        const clientsUserRole= this.RoleRepository.create({roleName:'CLIENTS_USER_ROLE',department:clientsDepartment});

        await this.RoleRepository.save(superAdminRole);
        await this.RoleRepository.save(warehouseAdminRole);
        await this.RoleRepository.save(warehouseUserRole);
        await this.RoleRepository.save(salesAdminRole);
        await this.RoleRepository.save(salesUserRole);
        await this.RoleRepository.save(clientsAdminRole);
        await this.RoleRepository.save(clientsUserRole);
    }

    private async CreateSuperAdmin(){

        const salt = await bcrypt.genSalt();
        const cryptedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD,salt);
        const superAdminRole =await this.RoleRepository.findOne({where:{roleName:'ADMIN_ROLE'}});
        const adminUser = this.UserRepository.create({
            userName:process.env.ADMIN_USERNAME,
            password:cryptedPassword,
            role: superAdminRole});
        await this.UserRepository.save(adminUser);


    }

    
}


