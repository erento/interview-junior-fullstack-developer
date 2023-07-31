import { Controller, Body, Get, Param } from '@nestjs/common';

import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get(':query?')
  getAllCities(@Param('query') query: string) {
    return this.citiesService.getCities(query);
  }
}
