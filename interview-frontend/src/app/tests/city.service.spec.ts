import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { CityService } from '../services/city.service';
import City from '../../../../interview-backend/src/entities/City';
import { throwError } from 'rxjs';

describe('DataService', () => {
  let httpTestingController: HttpTestingController;
  let service: CityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(CityService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  //getCities method testing
  
  it('#getCities should return expected data', (done) => {
    const expectedData: City[] = [
      { 'uuid': '7e8a29e2-62d1-4ec1-ae15-8ff2f777318f','cityName': 'Berlin', 'count': 523 },
      { 'uuid': '4a7f5c2d-3a10-4a02-a9b3-450839929e43','cityName': 'Hamburg', 'count': 267 },
      { 'uuid': '09a20ce8-eb77-40f9-99c8-aa4e7dbf6a99','cityName': 'München', 'count': 899 },
    ];

    service.getCities().subscribe(data => {
      expect(data).toEqual(expectedData);
      done();
    });

    const testRequest = httpTestingController.expectOne('http://localhost:3000');

    testRequest.flush(expectedData);
  });


  it('#getCities should use GET to retrieve data', () => {
    service.getCities().subscribe();

    const testRequest = httpTestingController.expectOne('http://localhost:3000');

    expect(testRequest.request.method).toEqual('GET');
  });


  //findCities() method testing

  it('#findCities should return expected data', (done) => {
    const expectedData: City[] = [
      { 'uuid': '7e8a29e2-62d1-4ec1-ae15-8ff2f777318f','cityName': 'Berlin', 'count': 523 },
      { 'uuid': '09a20ce8-eb77-40f9-99c8-aa4e7dbf6a99','cityName': 'München', 'count': 899 },
    ];

    service.findCities("n").subscribe(data => {
      expect(data).toEqual(expectedData);
      done();
    });

    const testRequest = httpTestingController.expectOne('http://localhost:3000/search/n');

    testRequest.flush(expectedData);
  });


  it('#findCities should use GET to retrieve data', () => {
    service.findCities("r").subscribe();

    const testRequest = httpTestingController.expectOne('http://localhost:3000/search/r');

    expect(testRequest.request.method).toEqual('GET');
  });

});