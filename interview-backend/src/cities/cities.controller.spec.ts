import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { PaginatedCities } from './paginationResponse';

describe('CitiesController', () => {
  let controller: CitiesController;
  let service: CitiesService;

  const mockPaginatedCities: PaginatedCities = {
    cities: [
      {
        uuid: 'uuid',
        cityName: 'Hamburg',
        count: 293,
      },
    ],
    paginationMetadata: {
      total_records: 100,
      current_page: 1,
      total_pages: 10,
      next_page: 2,
      prev_page: null,
      links: {
        first: 'firstLink',
        last: 'lastLink',
        current: 'currentLink',
      },
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [CitiesService],
    }).compile();

    controller = module.get<CitiesController>(CitiesController);
    service = module.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of cities and pagination information', async () => {
      const result: PaginatedCities = mockPaginatedCities;
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findAllMatching', () => {
    it('should return an array of cities and pagination information', async () => {
      const result: PaginatedCities = mockPaginatedCities;
      jest
        .spyOn(service, 'findAllMatching')
        .mockImplementation(() => Promise.resolve(result));

      expect(await controller.findAllMatching('Hamburg')).toBe(result);
    });
  });
});
