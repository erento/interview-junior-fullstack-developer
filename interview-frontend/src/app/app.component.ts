import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CityInterface } from './city.interface';
import { CitiesService } from './cities.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  searchValue = '';
  articles: CityInterface[] = [];
  searchForm = this.fb.nonNullable.group({
    searchValue: '',
  });

  constructor(
    private articlesService: CitiesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.articlesService.getCities(this.searchValue).subscribe((articles) => {
      this.articles = articles;
    });
  }

  onSearchSubmit(): void {
    this.searchValue = this.searchForm.value.searchValue ?? '';
    this.fetchData();
  }
}
