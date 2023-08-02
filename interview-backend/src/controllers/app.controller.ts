import {Controller,Get,HttpException,HttpStatus,Param,} from '@nestjs/common';
import { CityService } from '../services/city.service';
import City  from '../entities/City';

@Controller()
export class AppController {

  constructor(private readonly cityService: CityService) {}

  @Get()
  getCitites(): Set<City> {
    try {
      return this.cityService.getCities();
    } catch (error:any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @Get('/search/:filter')
  findCities(@Param('filter') filter: string): City[] {
    try {
      return this.cityService.filterCities(filter);
    } catch (error:any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
