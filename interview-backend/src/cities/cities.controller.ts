import { Controller, Get, Param, Query, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
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
  searchCitiesByName(@Param('name') name: string, @Query('page') page: number = 0, @Query('limit') limit: number = 5): { results: City[], totalResults: number } {
    try {
      return this.citiesService.searchCitiesByName(name, page, limit);
    } catch (error) {
      throw new NotFoundException()
    }
  }
}
