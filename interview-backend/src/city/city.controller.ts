import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';

  import { CityService } from './city.service';
  import { City } from '../schemas/city.schema';

  @Controller('city')
  export class CityController {
    constructor(private readonly cityService: CityService) {}
    @Post('/create')
    create(@Body() data: City) {
      return this.cityService.create(data);
    }
    @Get('/all')
    findAll() {
      return this.cityService.findAll();
    }
    @Get('/find/:id')
    findById(@Param('id') id: string) {
      return this.cityService.findById(id);
    }
    @Get('/findByName/:cityName')
    findByName(@Param('cityName') cityName: string) {
      return this.cityService.findByName(cityName);
    }
    @Patch('/:id')
    update(@Param('id') id: string, @Body() data: City) {
      return this.cityService.update(id, data);
    }
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.cityService.delete(id);
    }
  }