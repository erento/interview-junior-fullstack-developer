import { Module } from '@nestjs/common';
import { CitiesModule } from './cities/cities.module';
import { CitiesService } from './cities/cities.service';
import { CitiesController } from './cities/cities.controller';

@Module({
  imports: [CitiesModule],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class AppModule {}
