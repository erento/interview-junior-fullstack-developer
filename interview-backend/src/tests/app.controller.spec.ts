import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../controllers/app.controller';
import { CityService } from '../services/city.service';
import City from 'src/entities/City';

describe('AppController', () => {
  let appController: AppController;
  let cityService: CityService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [CityService], // Make sure CityService is provided in the testing module
    }).compile();

    cityService = app.get<CityService>(CityService);
    appController = app.get<AppController>(AppController);
  });

  describe('App Controller', () => {

    //Testing the function getCities()
    it('should return all of the cities', async () => {
      const mockCities = new Set<City>([
        { 'uuid': '7e8a29e2-62d1-4ec1-ae15-8ff2f777318f','cityName': 'Berlin', 'count': 523 },
        { 'uuid': '4a7f5c2d-3a10-4a02-a9b3-450839929e43','cityName': 'Hamburg', 'count': 267 },
        ]);
      
      jest.spyOn(appController, 'getCities').mockResolvedValue(mockCities as never);

      const result = await appController.getCities();

      expect(result).toBe(mockCities);
    });


    //Testing the function findCities(string)
    it('should return all of the cities when the filter is ""', async () => {
      const mockCities = new Array<City>(
        { 'uuid': '7e8a29e2-62d1-4ec1-ae15-8ff2f777318f','cityName': 'Berlin', 'count': 523 },
        { 'uuid': '4a7f5c2d-3a10-4a02-a9b3-450839929e43','cityName': 'Hamburg', 'count': 267 },
        { 'uuid': '09a20ce8-eb77-40f9-99c8-aa4e7dbf6a99','cityName': 'München', 'count': 899 }
        );

      const resultCities = new Array<City>(
        { 'uuid': '7e8a29e2-62d1-4ec1-ae15-8ff2f777318f','cityName': 'Berlin', 'count': 523 },
        { 'uuid': '4a7f5c2d-3a10-4a02-a9b3-450839929e43','cityName': 'Hamburg', 'count': 267 },
        { 'uuid': '09a20ce8-eb77-40f9-99c8-aa4e7dbf6a99','cityName': 'München', 'count': 899 }
        );
      
      jest.spyOn(appController,"findCities").mockResolvedValue(Array.from(mockCities)as never);

      const result = await appController.findCities("");

      expect(result.toString).toBe(resultCities.toString);
    });

    it('should return the cities which contains r letter', async () => {
      const mockCities = new Array<City>(
        { 'uuid': '7e8a29e2-62d1-4ec1-ae15-8ff2f777318f','cityName': 'Berlin', 'count': 523 },
        { 'uuid': '4a7f5c2d-3a10-4a02-a9b3-450839929e43','cityName': 'Hamburg', 'count': 267 },
        { 'uuid': '09a20ce8-eb77-40f9-99c8-aa4e7dbf6a99','cityName': 'München', 'count': 899 }
        );

      const resultCities = new Array<City>(
        { 'uuid': '7e8a29e2-62d1-4ec1-ae15-8ff2f777318f','cityName': 'Berlin', 'count': 523 },
        { 'uuid': '4a7f5c2d-3a10-4a02-a9b3-450839929e43','cityName': 'Hamburg', 'count': 267 }
        );
      
      jest.spyOn(appController,"findCities").mockResolvedValue(Array.from(mockCities)as never);

      const result = await appController.findCities("r");

      expect(result.toString).toBe(resultCities.toString);
    });

    it('should return maximum 5 cities with e letter in their names', async () => {
      const mockCities = new Array<City>(
        { 'uuid': '7e8a29e2-62d1-4ec1-ae15-8ff2f777318f','cityName': 'Berlin', 'count': 523 },
        { 'uuid': '4a7f5c2d-3a10-4a02-a9b3-450839929e43','cityName': 'Hamburg', 'count': 267 },
        { 'uuid': '09a20ce8-eb77-40f9-99c8-aa4e7dbf6a99','cityName': 'München', 'count': 899 },
        {"uuid": "93068f2d-35b5-4967-9b8d-64e23b6ddc89", "cityName": "Düsseldorf", "count": 315},
        {"uuid": "2c9a2f55-9bea-46db-8bc0-9051b3b3a540", "cityName": "Essen", "count": 990},
        {"uuid": "2b8847b6-dcc9-4e80-9a0c-0f1d7b8c9f34", "cityName": "Leipzig", "count": 48},
        {"uuid": "f6b6b4e1-d185-47b5-8c94-61502a4e341a", "cityName": "Bremen", "count": 656},
        {"uuid": "49c01e96-2a36-47bc-862f-803de4e8bdae", "cityName": "Dresden", "count": 198},
        );
        const resultCities = new Array<City>(
          { 'uuid': '7e8a29e2-62d1-4ec1-ae15-8ff2f777318f','cityName': 'Berlin', 'count': 523 },
          { 'uuid': '4a7f5c2d-3a10-4a02-a9b3-450839929e43','cityName': 'Hamburg', 'count': 267 },
          {"uuid": "93068f2d-35b5-4967-9b8d-64e23b6ddc89", "cityName": "Düsseldorf", "count": 315},
          {"uuid": "2c9a2f55-9bea-46db-8bc0-9051b3b3a540", "cityName": "Essen", "count": 990},
          {"uuid": "2b8847b6-dcc9-4e80-9a0c-0f1d7b8c9f34", "cityName": "Leipzig", "count": 48}
          );
      
      jest.spyOn(appController,"findCities").mockResolvedValue(mockCities as never);

      const result = await appController.findCities("e");
      expect(result.toString).toBe(resultCities.toString);
    });
  });
});
