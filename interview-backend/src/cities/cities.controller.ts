import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { CitiesService } from './cities.service';
import City from './city.entity';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  getAllCities(): City[] {
    try {
      return this.citiesService.getCities();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/search/:name')
  searchCitiesByName(@Param('name') name: string): City[] {
    try {
      return this.citiesService.searchCitiesByName(name);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
