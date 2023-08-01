import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import City from '../entities/City';

@Injectable()
export class CityService {
  
  private cities: Set<City>;
  constructor() {
    this.cities = JSON.parse(fs.readFileSync('./cities.json', 'utf8'));
  }

  getCities(): Set<City> {
    return this.cities;
  }

  filterCities(filter: string): City[] {
    return Array.from(this.cities).filter(s => s.cityName.toLowerCase().includes(filter.toLowerCase())).slice(0, 5);
  }
}