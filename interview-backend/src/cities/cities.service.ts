import { Injectable, NotFoundException } from '@nestjs/common';
import City from './city.entity';
import * as fs from 'fs';

@Injectable()
export class CitiesService {
  private cities: City[];

  constructor() {
    this.cities = JSON.parse(fs.readFileSync('../cities.json', 'utf8'));
  }

  getCities(): City[] {
    return this.cities;
  }

  searchCitiesByName(filter: string): Array<City> {
    const results = this.cities
      .filter(city => city.cityName.toLowerCase().includes(filter.toLowerCase()))
      .slice(0, 5); // limit to 5 results

    if (results.length === 0) {
      throw new NotFoundException();
    }

    return results;
  }
}
