import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent {
  city: string = '';
  searchQuery: string = ''; // just for display purposes
  cities: any[] = [];
  noResults = false;
  displayedColumns: string[] = ['uuid', 'cityName', 'count'];

  constructor(private http: HttpClient) {}

  searchCity() {
    this.noResults = false; // Reset the flag
    this.searchQuery = this.city;
    this.http.get<any[]>(`http://localhost:3000/cities/search/${this.city}`).subscribe(
      (data) => {
        this.cities = data;
        this.noResults = this.cities.length === 0;
      },
      (error) => {
        console.error(error);
        if (error.status === 404) { //because I return 404 in the backend
          this.noResults = true;
          this.cities = [];
        }
      }
    );
  }
}
