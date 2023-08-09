import { Injectable } from '@nestjs/common';

export interface City {
  uuid: string
  cityName: string
  count: number
}
export interface LocationPagination{
  page: number
  numberOfPages: number
  results: string[]
}
const cityList: City[] = require('../cities.json');

@Injectable()
export class LocationService {
  getLocation(cityName: string, page: number, pageSize: number = 5): LocationPagination {
    const arr = this.getCityName();
    const filteredCities = arr.filter(
      (el) => el.toLowerCase().includes(cityName.toLowerCase())
      );
    const numberOfCities = filteredCities.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return {
      results: filteredCities.slice(startIndex, endIndex), 
      numberOfPages: Math.ceil(numberOfCities/pageSize),
      page
    }
  }
  
  getCityName(): string[] {
    const cityNameFound = cityList.map(cityName => cityName.cityName);
    return cityNameFound;
  }
}
