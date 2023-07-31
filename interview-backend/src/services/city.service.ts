import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import City from '../entities/City';

@Injectable()
export class CityService {
  
  private cities: Array<City>;
  constructor() {
    this.cities = JSON.parse(fs.readFileSync('./cities.json', 'utf8'));
  }

  getCities(): City[] {
    return this.cities;
  }
}