import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import { EncryptionService } from '../encryption/encryption.service';
import { LoginDTO } from '@dto/login.dto';

import { CreateUserDTO } from '@dto/create-user.dto';
import { DepartmentEntity } from '@src/db/persistence/department.entity';
import { UserEntity } from '@src/db/persistence/user.entity';
import { RepositoryEnum } from '@src/enums/repositories.enum';

@Injectable()
export class UserService {

    constructor(
        @Inject(RepositoryEnum.DEPARTMENT) private readonly departmentRepository: Repository<DepartmentEntity>,
        @Inject(RepositoryEnum.USER) private readonly userRepository: Repository<UserEntity>,
        private readonly tokenService: JwtService,
        private readonly encryptionService: EncryptionService) { }


    async loginUser(loginDTO: LoginDTO) {

        const user = await this.userRepository.findOne({
            where: { userName: loginDTO.userName, status: 1 },
            relations: ['role']
        });

        if (!user) {
            throw new UnauthorizedException("Credenciales incorrectas");
        }

        const isPasswordCorrect: boolean = await this.encryptionService.verifyPassword(loginDTO.password, user.password)
        if (!isPasswordCorrect) {
            throw new UnauthorizedException("Credenciales incorrectas");
        }
        const token = await this.tokenService.signAsync({ id: user.id, role: user.role.roleName }, { secret: process.env.PRIVATEKEY , expiresIn: '2h' });
        return token;
    }

    async createUser(createUserDTO: CreateUserDTO, currentUser: UserEntity) {
        // Recuperar el departamento junto con los roles
        const department = await this.departmentRepository.findOne({
            where: {
                id: createUserDTO.departmentId,
                status: 1
            },
            relations: ['roles']
        });
    
        if (!department) {
            throw new BadRequestException(`No se encontró el departamento con id: ${createUserDTO.departmentId}`);
        }
    
        // Validar que el rol pertenece al departamento
        const role = department.roles.find((departmentRole) => departmentRole.id === createUserDTO.roleId);
        if (!role) {
            throw new BadRequestException(`El rol con id: ${createUserDTO.roleId} no corresponde al departamento enviado`);
        }
    
        // Encriptar la contraseña
        const cryptedPassword = await this.encryptionService.cryptPassword(createUserDTO.password);
    
        // Crear y guardar el usuario
        const newUser = this.userRepository.create({
            userName: createUserDTO.userName,
            password: cryptedPassword,
            role,
            createdBy: currentUser.id,
            updatedBy: currentUser.id
        });
    
        const { id, userName } = await this.userRepository.save(newUser);
        return { id, userName };
    }
    

    async findUserById(id: number) {
        const user = await this.userRepository.findOne({
            where: { id, status: 1 },
            relations: ['role']
        });
        return user;
    }

    async deleteUser(userId:number,currentUser:UserEntity){
        try {
            const user = await this.userRepository.findOneBy({id:userId});
            if(!user){
                throw new NotFoundException("No se encontró al usuario");
            }
            user.status=2;
            user.updatedBy=currentUser.id;
            await this.userRepository.save(user);
            return {ok:true, msg:`El usuario ${user.userName} fue eliminado`}
        } catch (error) {
            throw new InternalServerErrorException(`Ocurrió un error`);
        }
    }
}
