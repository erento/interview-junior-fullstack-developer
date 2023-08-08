import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CitySearchService } from '../city-search.service';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss'],
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

  constructor(private citySearchService: CitySearchService) {}

  searchCity() {
    this.noResults = false; //reset flag
    this.searchQuery = this.city;
    this.currentPage = 0; //reset page to first
    this.fetchCities();
  }

  pageChanged(event: PageEvent) {
    this.itemsPerPage = event.pageSize; //update items per page
    this.currentPage = event.pageIndex; //update page index
    this.fetchCities();
  }

  private fetchCities() {
    this.citySearchService
      .searchCitiesByName(this.city, this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (data) => {
          this.cities = data.results;
          this.totalResults = data.totalResults;
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
