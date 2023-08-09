import { Controller, Get, Param, Query,} from '@nestjs/common';
import { City, LocationPagination, LocationService,} from './location.service';

@Controller()
export class LocationController { 
  constructor(private readonly locationService: LocationService) {}

  @Get('location/:cityName')
  getLocation(
    @Param('cityName') cityName: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize?: number,
    ) :LocationPagination {
    return this.locationService.getLocation(cityName,page,pageSize);
  }

  @Get('names')
  getCityName() :string[] {
    return this.locationService.getCityName();
  }
}
