import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CatsService } from './_services/cats.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private catService: CatsService) {}

  // Display loading icon when fetching data
  loading = true;

  title = 'Cool Cats and Kittens';
  cats: Object;

  ngOnInit() {
    this.catService.getCats().then((res) => {
      this.cats = res;
      this.loading = false;
    });
  }
}
