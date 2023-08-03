import { Component } from '@angular/core';
import { LocationService } from './location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor (private locationService: LocationService) {}
  
  public filteredCityList: string[] = [];

  public filterCity(inputCity: string) {
    this.locationService.getCityName(inputCity).subscribe(
      response => {
        this.filteredCityList = response;
      }
    );
  }
}
