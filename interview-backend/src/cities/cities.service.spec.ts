import { Test, TestingModule } from '@nestjs/testing';
import { CitiesService } from './cities.service';
import { PaginatedCities } from './paginationResponse';
import { City } from './entities/city.entity';

describe('CitiesService', () => {
  let service: CitiesService;

  const mockedDatabaseData: City[] = [
    {
      uuid: 'uuid1',
      cityName: 'Hamburg',
      count: 243,
    },
    {
      uuid: 'uuid2',
      cityName: 'Berlin',
      count: 193,
    },
    {
      uuid: 'uuid3',
      cityName: 'München',
      count: 993,
    },
    {
      uuid: 'uuid4',
      cityName: 'Köln',
      count: 393,
    },
    {
      uuid: 'uuid5',
      cityName: 'Düsseldorf',
      count: 913,
    },
    {
      uuid: 'uuid6',
      cityName: 'Frankfurt',
      count: 991,
    },
  ];

  const mockPaginatedCities: PaginatedCities = {
    cities: [
      {
        uuid: 'uuid1',
        cityName: 'Hamburg',
        count: 243,
      },
      {
        uuid: 'uuid2',
        cityName: 'Berlin',
        count: 193,
      },
      {
        uuid: 'uuid3',
        cityName: 'München',
        count: 993,
      },
      {
        uuid: 'uuid4',
        cityName: 'Köln',
        count: 393,
      },
      {
        uuid: 'uuid5',
        cityName: 'Düsseldorf',
        count: 913,
      },
      {
        uuid: 'uuid6',
        cityName: 'Frankfurt',
        count: 991,
      },
    ],
    paginationMetadata: {
      total_records: 100,
      current_page: 1,
      total_pages: 10,
      next_page: 2,
      prev_page: null,
      links: {
        first: 'http://localhost:3000/cities?limit=5&page=1',
        last: 'http://localhost:3000/cities?limit=5&page=1',
        current: 'http://localhost:3000/cities?limit=5&page=1',
      },
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitiesService],
    }).compile();

    service = module.get<CitiesService>(CitiesService);

    jest
      .spyOn(service, 'fetchFromMockDatabase')
      .mockImplementation(() => Promise.resolve(mockedDatabaseData));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of all cities', async () => {
      const result: PaginatedCities = mockPaginatedCities;

      expect((await service.findAll(1, 6)).cities).toStrictEqual(result.cities);
    });
  });

  //TODO: add tests for findAllMatching
  //TODO: add tests for pagination logic
});
