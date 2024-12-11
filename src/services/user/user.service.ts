import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/db/persistence/user.entity';
import { RepositoryEnum } from 'src/enums/repositories.enum';
import { Repository } from 'typeorm';
import { EncryptionService } from '../encryption/encryption.service';
import { LoginDTO } from 'src/dto/login.dto';

@Injectable()
export class UserService {

    constructor(
        @Inject(RepositoryEnum.USER) private readonly userRepository:Repository<UserEntity>,
        private readonly tokenService: JwtService,
        private readonly encryptionService:EncryptionService){}


    async loginUser(loginDTO:LoginDTO){

        const user = await this.userRepository.findOne({
            where:{userName:loginDTO.userName,status:1},
            relations:['role']});
      
        if(!user){
            throw new UnauthorizedException("Credenciales incorrectas");
        }

        const isPasswordCorrect:boolean= await this.encryptionService.verifyPassword(loginDTO.password,user.password)
        if(!isPasswordCorrect){
            throw new UnauthorizedException("Credenciales incorrectas");
        }
        const token=await this.tokenService.signAsync({id:user.id, role:user.role.roleName},{secret: process.env.PRIVATEKEY});
        return token;
    }
}
