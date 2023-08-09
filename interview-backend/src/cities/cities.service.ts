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
    const filteredResults = this.cities.filter(city =>
      city.cityName.toLowerCase().includes(filter.toLowerCase())
    );
    //initially done with .slice(0,5);

    const totalResults = filteredResults.length;
    const startIndex = page * limit;

    const indexAndLimit = Number(startIndex) + Number(limit)

    const endIndex = Math.min(indexAndLimit, totalResults);

    if (startIndex >= totalResults) {
      throw new NotFoundException();
    }

    const paginatedResults = filteredResults.slice(startIndex, endIndex);

    return { results: paginatedResults, totalResults: totalResults };
  }


}
