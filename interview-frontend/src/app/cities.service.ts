import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CityInterface } from './city.interface';

@Injectable()
export class CitiesService {
  constructor(private http: HttpClient) {}

  getCities(searchValue: string): Observable<CityInterface[]> {
    return this.http.get<CityInterface[]>(
      `http://localhost:3000/cities/${searchValue}`
    );
  }
}
