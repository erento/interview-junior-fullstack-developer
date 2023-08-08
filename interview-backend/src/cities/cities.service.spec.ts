import { Test, TestingModule } from '@nestjs/testing';
import { CitiesService } from './cities.service';
import City from './city.entity';
import { NotFoundException } from '@nestjs/common';


describe('CitiesService', () => {
  let service: CitiesService;
  let mockCities: City[];

  beforeEach(async () => {
    mockCities = [
      { uuid: '1', cityName: 'Berlin', count: 100 },
      { uuid: '2', cityName: 'Munich', count: 50 },
    ];

    const module: TestingModule = await Test.createTestingModule({
      providers: [CitiesService],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
    service['cities'] = mockCities;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all cities', () => {
    const cities = service.getCities();
    expect(cities).toEqual(mockCities);
  });

  describe('searchCitiesByName', () => {
    it('should search cities by name', () => {
      const results = service.searchCitiesByName('Berlin');
      expect(results).toEqual([mockCities[0]]);
    });

    it('should throw a NotFoundException if no cities are found by name', () => {
      expect(() => service.searchCitiesByName('UnknownCity')).toThrow(NotFoundException);
    });

  });
});
