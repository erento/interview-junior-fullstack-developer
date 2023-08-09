import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import City from './city.entity';

describe('CitiesController', () => {
  let controller: CitiesController;
  let service: CitiesService;

  beforeEach(async () => {
    service = new CitiesService();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [
        {
          provide: CitiesService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<CitiesController>(CitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all cities', () => {
    const mockCities: City[] = [
      { uuid: '1', cityName: 'Berlin', count: 100 },
      { uuid: '2', cityName: 'Munich', count: 50 },
    ];
    jest.spyOn(service, 'getCities').mockReturnValue(mockCities);

    expect(controller.getAllCities()).toEqual(mockCities);
  });

  it('should search cities by name', () => {
    const mockCities: City[] = [{ uuid: '1', cityName: 'Berlin', count: 100 }];
    jest.spyOn(service, 'searchCitiesByName').mockReturnValue({ results: mockCities, totalResults: 1 });

    expect(controller.searchCitiesByName('Berlin')).toEqual({ results: mockCities, totalResults: 1 });
  });

  it('should return an empty array if no cities are found by name', () => {
    jest.spyOn(service, 'searchCitiesByName').mockReturnValue({ results: [], totalResults: 0 });

    expect(controller.searchCitiesByName('UnknownCity')).toEqual({ results: [], totalResults: 0 });
  });
});
