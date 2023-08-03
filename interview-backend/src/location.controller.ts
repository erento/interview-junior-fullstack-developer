import { Controller, Get, Param,} from '@nestjs/common';
import { City, LocationService } from './location.service';

@Controller()
export class LocationController { 
  constructor(private readonly locationService: LocationService) {}

  @Get('location/:cityName')
  getLocation(@Param('cityName') cityName: string) :string[] {
    return this.locationService.getLocation(cityName);
  }

  @Get('names')
  getCityName() :string[] {
    return this.locationService.getCityName();
  }
}

