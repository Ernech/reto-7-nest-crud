import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/db/persistence/user.entity';
import { RepositoryEnum } from 'src/enums/repositories.enum';
import { Repository } from 'typeorm';
import { EncryptionService } from '../encryption/encryption.service';
import { LoginDTO } from 'src/dto/login.dto';
import { DepartmentEntity } from 'src/db/persistence/department.entity';
import { RoleEntity } from 'src/db/persistence/role.entity';
import { CreateUserDTO } from 'src/dto/create-user.dto';

@Injectable()
export class UserService {

    constructor(
        @Inject(RepositoryEnum.USER) private readonly userRepository: Repository<UserEntity>,
        @Inject(RepositoryEnum.DEPARTMENT) private readonly departmentRepository: Repository<DepartmentEntity>,
        @Inject(RepositoryEnum.ROLE) private readonly roleRepository: Repository<RoleEntity>,
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
   
        const department = await this.departmentRepository.findOne(
            {
                where:
                {
                    id: createUserDTO.departmentId,
                    status: 1
                },
                relations: ['roles']
            });
        if (!department) {
            throw new BadRequestException(`No se encontró el departamento con id: ${createUserDTO.departmentId}`);
        }
        //Recuperar el rol
        const role = await this.roleRepository.findOne({ where: { id: createUserDTO.roleId, status: 1 } });
        if (!role) {
            throw new BadRequestException(`No se encontró el rol con id: ${createUserDTO.roleId}`);
        }
        //Verificar que el rol corresponde al departamento
        if (!department.roles.find(department => department.id = role.id)) {
            throw new BadRequestException(`El rol con id: ${createUserDTO.roleId} no corresponde al departamento enviado`);
        }

        //Se crea el usuario
        const cryptedPassword = await this.encryptionService.cryptPassword(createUserDTO.password);
        const newUser = this.userRepository.create({
            userName: createUserDTO.userName, password: cryptedPassword,
            role,
            createdBy: currentUser.id,
            updatedBy: currentUser.id
        })
        const {id, userName} = await this.userRepository.save(newUser)
        return {id,userName};
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
