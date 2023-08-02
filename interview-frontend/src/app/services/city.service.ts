import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, catchError, map, of, throwError } from 'rxjs';
import City from '../../../../interview-backend/src/entities/City';

@Injectable({
  providedIn: 'root',
})

export class CityService {
  private host = 'http://localhost:3000';
  errorMessage:string="";
  constructor(private http: HttpClient) {
    this.errorMessage="semmi"
  }
  
  getCities() {
    return this.http.get(this.host).pipe(
      map((res) => res),
      catchError((error) => {
        this.errorMessage = error.message;
        return of(null); 
      })
    );
  }

  findCities(text:string) {
    return this.http.get(this.host+"/search/"+text).pipe(
      map((res) => res),
      catchError((error) => {
        this.errorMessage = error.message;
        return of(null); 
      })
    );
  }
}