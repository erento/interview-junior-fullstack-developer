import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';

@Module({
  providers: [CitiesService],
  controllers: [CitiesController]
})
export class CitiesModule {}
