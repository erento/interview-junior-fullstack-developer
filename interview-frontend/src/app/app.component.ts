import { Component } from '@angular/core';
import { CityService } from '../app/city.service';

interface City {
  uuid: string;
  cityName: string;
  count: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cities: City[];
  text:string;
  
  constructor(
    private cityService: CityService,
  ) {
    this.cities = [];
    this.text="";
  }
  title = 'task-ui';
 
  ngOnInit() {
    this.cityService.getCities().subscribe((data) => {
      this.cities = data as City[];
    });
  }

  OnSearch(){
    this.cityService.findCities(this.text).subscribe((data) => {
      console.log(this.cities)
      this.cities = data as City[];
    });
  }
}
