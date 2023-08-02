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
  appendAlert:any;
  alertPlaceholder:any;
  wrapper:any;

  constructor(
    private cityService: CityService,
  ) {
    this.cities = [];
    this.text="";
  }
  title = 'task-ui';
 
  ngOnInit() {
    this.GetAllCities();
    this.alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    this.appendAlert = (message:any) => {
      this.wrapper = document.createElement('div')
      this.wrapper.innerHTML = [
        `<div class="alert alert-danger" role="alert">`,
        ` <div class="alertt">`,
        '   <i class="bi bi-x-octagon-fill"></i>',
        `   <label">${message}</label>`,
        ' </div>',
        '</div>'
      ].join('');
     if(this.alertPlaceholder) this.alertPlaceholder.append(this.wrapper);
    }
  }

  GetAllCities(){
    this.cityService.getCities().subscribe((data) => {
      this.cities = data as City[];
    });
  }

  OnSearch(){
    if(!this.IsStringOnlyCharacters(this.text))
      this.appendAlert("Please type letters only to the input field!");
    else
    {
      if(this.text=="") this.GetAllCities();
      else{
        this.cityService.findCities(this.text).subscribe((data) => {
        this.cities = data as City[];});
      }
      if(this.alertPlaceholder.children[0]!=undefined) this.alertPlaceholder.removeChild(this.wrapper);
    }
  }

  IsStringOnlyCharacters(input: string): boolean {
    return Array.from(input).every((char) => /^[A-Za-z]$/.test(char));
  }
}
