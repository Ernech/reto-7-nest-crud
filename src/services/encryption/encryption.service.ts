import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class EncryptionService {

    async cryptPassword(password:string){
        const salt = await bcrypt.genSalt();
        const cryptedPassword = await bcrypt.hash(password,salt);
    
        return cryptedPassword;
    }
    async verifyPassword(password:string,encryptedPasswsord:string){
        return await bcrypt.compare(password, encryptedPasswsord)
    }
}
