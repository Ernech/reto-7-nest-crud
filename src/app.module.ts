import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceModule } from './services/service.module';
import { ControllersModule } from './controllers/controllers.module';
import { GuardModule } from './guard/guard.module';

@Module({
  imports: [ServiceModule, ControllersModule, GuardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
