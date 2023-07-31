import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { City } from './city.model';

@Injectable()
export class CitiesService {
  private cities: City[] = [];

  getCities(query) {
    if (this.cities.length === 0) this.parseCities();
    return query ? this.findCity(query) : this.cities;
  }

  private findCity(query: string): City[] {
    const regex = new RegExp(`^${query}`, 'i');
    return this.cities.filter(city => regex.test(city.cityName));
  }

  private parseCities(): void {
    const path = 'cities.json';
    const rawData = fs.readFileSync(path, 'utf8');
    this.cities = JSON.parse(rawData);
  }
}
