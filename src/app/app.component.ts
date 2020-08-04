import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CatService } from './_services/cat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private catService: CatService) {}

  // Display loading icon when fetching data
  loading = true;

  title = 'Cool Cats and Kittens';
  cats: Object;

  ngOnInit() {
    this.catService.getCats().subscribe((cats) => {
      this.cats = cats;
      this.loading = false;
    });
  }
}
