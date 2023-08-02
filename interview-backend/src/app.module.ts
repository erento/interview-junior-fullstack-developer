import { Inject, Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { CityService } from './services/city.service';


@Module({
  imports: [],
  controllers: [AppController],
  providers: [CityService],
})

export class AppModule {
  
}
