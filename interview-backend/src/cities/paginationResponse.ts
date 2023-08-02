import { ApiProperty } from '@nestjs/swagger';
import { City } from './entities/city.entity';

export class PaginatedCities {
  @ApiProperty({ type: [City], description: 'Array of cities' })
  cities: City[];

  @ApiProperty({
    description: 'Pagination information',
    example: {
      total_records: 100,
      current_page: 1,
      total_pages: 10,
      next_page: 2,
      prev_page: null,
      links: {
        first: 'http://localhost:3000/cities?limit=10&page=1',
        last: 'http://localhost:3000/cities?limit=10&page=10',
        current: 'http://localhost:3000/cities?limit=10&page=1',
        next: 'http://localhost:3000/cities?limit=10&page=2',
        prev: null,
      },
    },
  })
  paginationMetadata: {
    total_records: number;
    current_page: number;
    total_pages: number;
    next_page: number | null;
    prev_page: number | null;
    links: PaginationLinks;
  };
}

export type PaginationLinks = {
  first: string;
  last: string;
  current: string;
  previous?: string;
  next?: string;
};
