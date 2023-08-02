import { Component } from '@angular/core';
import { CityService } from '../services/city.service';
import City from '../../../../interview-backend/src/entities/City'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  protected cities: City[];
  protected text:string;
  private appendAlert:any;
  private alertPlaceholder:any;
  private wrapper:any;
  title = 'interview-frontend';

  constructor(private cityService: CityService) {
    this.cities = [];
    this.text="";
  }
 
  ngOnInit() {
    this.getAllCities();
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
      console.log(this.alertPlaceholder.children[0])
     if(this.alertPlaceholder.children[0]==undefined) this.alertPlaceholder.append(this.wrapper);
    }
  }

  getAllCities(){
    this.cityService.getCities().subscribe((data) => {
      this.cities = data as City[];
    });
  }

  onSearch(){
    if(!this.isStringOnlyCharacters(this.text))
      this.appendAlert("Please type letters only to the input field!");
    else
    {
      if(this.text=="") this.getAllCities();
      else{
        this.cityService.findCities(this.text).subscribe((data) => {
        this.cities = data as City[];});
      }
      if(this.alertPlaceholder.children[0]!=undefined) this.alertPlaceholder.removeChild(this.alertPlaceholder.children[0]);
    }
  }

  isStringOnlyCharacters(input: string): boolean {
    return Array.from(input).every((char) => /^[A-Za-z]$/.test(char));
  }
}
