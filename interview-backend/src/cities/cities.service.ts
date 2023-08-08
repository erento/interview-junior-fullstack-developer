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

  searchCitiesByName(filter: string, page: number, limit: number): { results: City[], totalResults: number } {
    const results = this.cities
      .filter(city => city.cityName.toLowerCase().includes(filter.toLowerCase()));

    if (results.length === 0) {
      throw new NotFoundException();
    }

    const paginatedResults = results.slice(page * limit, (page * limit) + limit);

    return { results: paginatedResults, totalResults: results.length };
  }
}
