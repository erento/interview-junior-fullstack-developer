import { Component } from '@angular/core';
import { LocationService } from './location.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  constructor (private locationService: LocationService) {}
  
  public currentPage: number = 1;
  public pageSize = 5;
  public filteredCityList: string[] = [];
  public currentSearch: string = "";
  public numberOfPages: number = 0;
  public pageMarkers: number[] = [];
  

  public filterCity(inputCity: string) {
    this.currentSearch = inputCity;
    this.currentPage = 1; 
    this.fetchCityData(inputCity);
  }

  public onPageChange(pageNumber: number) {
    this.currentPage += pageNumber;
    this.fetchCityData(this.currentSearch);
  }

  public fetchCityData(cityQuery: string) {
    this.locationService.getCityName(cityQuery, this.currentPage).subscribe(
      response => {
        this.filteredCityList = response.results;
        this.currentPage = +response.page;
        this.numberOfPages = +response.numberOfPages;
        this.pageMarkers = Array.from({ length: this.numberOfPages }, (_, index) => index + 1);
      }
    );
  }

  public onPageMarkerClick(page: number) {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.fetchCityData(this.currentSearch);
    }
  }
}
