import { Injectable } from '@nestjs/common';

export interface City {
  uuid: string
  cityName: string
  count: number
}
const cityList: City[] = require('../cities.json');

@Injectable()
export class LocationService {
  getLocation(cityName: string): string[] {
    const arr = this.getCityName();
    return arr.filter(
      (el) => el.toLowerCase().includes(cityName.toLowerCase())
    ).slice(0,5);
  }

  getCityName(): string[] {
    const cityNameFound = cityList.map(cityName => cityName.cityName);
    return cityNameFound;
  }
}
