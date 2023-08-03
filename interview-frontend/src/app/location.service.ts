import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LocationService{
    constructor(private http: HttpClient){}
    public getCityName(cityQuery: string): Observable<string[]> {
        return this.http.get<string[]>(`http://localhost:3000/location/${cityQuery}`);
    }
}
