import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CityService {
  private host = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  
  getCities() {
    return this.http.get(this.host).pipe(map((res) => res)).pipe(
      catchError(this.handleError) // then handle the error
    );
  }

  findCities(text:string) {
    return this.http.get(this.host+"/search/"+text).pipe(map((res) => res)).pipe(
      catchError(this.handleError) // then handle the error
    );
    
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}