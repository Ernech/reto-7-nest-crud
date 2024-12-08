import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceModule } from './services/service.module';
import { ControllersModule } from './controllers/controllers.module';

@Module({
  imports: [ServiceModule, ControllersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
