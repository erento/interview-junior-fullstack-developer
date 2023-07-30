import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgFor, AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';

/**
 * @title Highlight the first autocomplete option
 */
@Component({
  selector: 'citysearch',
  templateUrl: './citysearch.component.html',
  styleUrls: ['./citysearch.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
    MatButtonModule,
    MatListModule
  ],
})
export class CitysearchComponent implements OnInit {
  myControl = new FormControl('');
  options = [];
  listItems = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {      
      // Simple GET request with response type <any>
      this.http.get<any>('http://localhost:3000/city/all').subscribe(data => {
          this.options = data;
      })
  }
  updateList() {
    this.http.get<any>('http://localhost:3000/city/findByName/' + this.myControl.value).subscribe(data => {
        this.listItems = data;
    })
  }
}