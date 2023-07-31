import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CityService } from '../services/city.service';
import City  from '../entities/City';

@Controller()
export class AppController {

  constructor(private readonly cityService: CityService) {}

  @Get()
  getCitites(): City[] {
    try {
      return this.cityService.getCities();
    } catch (error:any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @Get('/search/:filter')
  findCities(): City[] {
    try {
      return [ {"uuid": "7e8a29e2-62d1-4ec1-ae15-8ff2f777318f", "cityName": "Berlin", "count": 523}];
    } catch (error:any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
