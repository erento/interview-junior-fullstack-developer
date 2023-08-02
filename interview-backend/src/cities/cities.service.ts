import { Injectable } from '@nestjs/common';
import { City } from './entities/city.entity';
import * as mockDatabaseData from '../../cities.json';

@Injectable()
export class CitiesService {
  private readonly cities: City[] = [];

  async findAll(): Promise<City[]> {
    const mockDatabaseData = await fetchFromMockDatabase();
    return mockDatabaseData;
  }

  async findAllMatching(searchString: string): Promise<City[]> {
    const mockDatabaseData = await fetchFromMockDatabase();

    //this would normally be done on the database
    return mockDatabaseData.filter((city: City) => {
      return city.cityName.toLowerCase().includes(searchString);
    });
  }
}

async function fetchFromMockDatabase(): Promise<City[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDatabaseData);
    }, 500);
  });
}
