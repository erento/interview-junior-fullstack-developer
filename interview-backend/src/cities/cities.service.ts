import { Injectable } from '@nestjs/common';
import { City } from './entities/city.entity';
import * as mockDatabaseData from '../../cities.json';
import { PaginatedCities, PaginationLinks } from './paginationResponse';

@Injectable()
export class CitiesService {
  private readonly cities: City[] = [];

  async findAll(page: number, limit: number): Promise<PaginatedCities> {
    const mockDatabaseData: City[] = await this.fetchFromMockDatabase();
    const paginationInformation: PaginatedCities =
      this.generatePaginationInformation(mockDatabaseData, page, limit);

    return paginationInformation;
  }

  async findAllMatching(
    searchString: string,
    page: number,
    limit: number,
  ): Promise<PaginatedCities> {
    const mockDatabaseData = await this.fetchFromMockDatabase();

    //this would normally be done on the database
    const filteredCities: City[] = mockDatabaseData.filter((city: City) => {
      return city.cityName.toLowerCase().includes(searchString);
    });

    const paginationInformation = this.generatePaginationInformation(
      filteredCities,
      page,
      limit,
    );

    return paginationInformation;
  }

  private generatePaginationInformation(
    mockDatabaseData: City[],
    page: number,
    limit: number,
  ): PaginatedCities {
    const totalRecords = mockDatabaseData.length;
    const totalPages = Math.ceil(totalRecords / limit);

    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, totalRecords);

    const citiesOnPage = mockDatabaseData.slice(startIndex, endIndex);

    const paginationLinks = this.generatePaginationLinks(
      page,
      limit,
      totalPages,
    );

    const paginationInformation = {
      total_records: totalRecords,
      current_page: page,
      total_pages: totalPages,
      next_page: page < totalPages ? page + 1 : null,
      prev_page: page > 1 ? page - 1 : null,
      links: paginationLinks,
    };

    return {
      cities: citiesOnPage,
      paginationMetadata: paginationInformation,
    };
  }

  async fetchFromMockDatabase(): Promise<City[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockDatabaseData);
      }, 500);
    });
  }

  private generatePaginationLinks(
    page: number,
    limit: number,
    totalPages: number,
  ): PaginationLinks {
    const baseUrl = 'http://localhost:3000/cities';

    const paginationLinks: PaginationLinks = {
      first: `${baseUrl}?limit=${limit}&page=1`,
      last: `${baseUrl}?limit=${limit}&page=${totalPages}`,
      current: `${baseUrl}?limit=${limit}&page=${page}`,
    };

    if (page > 1) {
      paginationLinks.previous = `${baseUrl}?limit=${limit}&page=${page - 1}`;
    }

    if (page < totalPages) {
      paginationLinks.next = `${baseUrl}?limit=${limit}&page=${page + 1}`;
    }

    return paginationLinks;
  }
}
