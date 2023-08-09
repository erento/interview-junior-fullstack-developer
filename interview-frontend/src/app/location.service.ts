import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

export interface LocationPagination{
    page: number
    numberOfPages: number
    results: string[]
  }

@Injectable()
export class LocationService{
    constructor(private http: HttpClient){}
    public getCityName(cityQuery: string,page: number): Observable<LocationPagination> {
        let queryParams = new HttpParams();
        queryParams = queryParams.append("page",page);

        return this.http.get<LocationPagination>(`http://localhost:3000/location/${cityQuery}`,{params:queryParams});
    }
}
