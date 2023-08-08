import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

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
  totalResults = 0;
  itemsPerPage = 5;
  currentPage = 0;
  // These 3 above are just for total results count, default items per page and the page index
  displayedColumns: string[] = ['cityName', 'count', 'uuid'];

  constructor(private http: HttpClient) {}

  searchCity() {
    this.noResults = false; // Reset the flag
    this.searchQuery = this.city;
    this.currentPage = 0; // Reset to the first page
    this.fetchCities();
  }

  pageChanged(event: PageEvent) {
    this.itemsPerPage = event.pageSize; // Update items per page
    this.currentPage = event.pageIndex; // Update current page index
    this.fetchCities();
  }

  private fetchCities() {
    const params = new HttpParams()
      .set('page', this.currentPage.toString())
      .set('limit', this.itemsPerPage.toString());

      this.http.get<any>(`http://localhost:3000/cities/search/${this.city}`, { params })
      .subscribe({
        next: (data) => {
          this.cities = data.results;
          this.totalResults = data.totalResults || 0;
          this.noResults = this.cities.length === 0;
        },
        error: (error) => {
          console.error(error);
          if (error.status === 404) {
            this.noResults = true;
            this.cities = [];
            this.totalResults = 0;
          }
        },
      });

  }
}
