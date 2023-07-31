import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CityService {
  host = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  
  getCities() {
    return this.http.get(this.host).pipe(map((res) => res));
  }

  findCities(text:string) {
    return this.http.get(this.host+"/search/"+text).pipe(map((res) => res));
  }
}