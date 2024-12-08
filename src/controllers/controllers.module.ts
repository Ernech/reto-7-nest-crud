import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/services/service.module';

@Module({
    imports:[ServiceModule],
    controllers:[]
})
export class ControllersModule {}
