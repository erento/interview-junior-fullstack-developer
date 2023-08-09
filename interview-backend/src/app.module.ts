import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  imports: [],
  controllers: [AppController, LocationController],
  providers: [AppService, LocationService],
})
export class AppModule {}
