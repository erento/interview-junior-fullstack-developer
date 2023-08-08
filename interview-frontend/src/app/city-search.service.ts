import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitySearchService {
  private apiUrl = 'http://localhost:3000/cities';

  constructor(private http: HttpClient) {}

  searchCitiesByName(city: string, page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<any>(`${this.apiUrl}/search/${city}`, { params }).pipe(
      map((data) => ({
        results: data.results,
        totalResults: data.totalResults || 0,
      }))
    );
  }
}
