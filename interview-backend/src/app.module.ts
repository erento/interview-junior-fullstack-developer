import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CityModule } from './city/city.module';

@Module({
  imports: [
    CityModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/interview'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
