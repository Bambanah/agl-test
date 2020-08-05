import { Component, OnInit } from '@angular/core';

import { CatService } from './_services/cat.service';
import { Cats } from './_models/cats';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private catService: CatService) {}

  // Don't display information until finished loading
  isLoaded = false;

  // Initialise variables
  title = 'Cool Cats and Kittens'; // Header displayed on page
  cats: Cats; // Local object to store cats

  ngOnInit() {
    // Get list of cats from service
    this.catService.getCats().subscribe((cats) => {
      this.cats = cats; // Save to local variable
      this.isLoaded = true; // Toggle loading (display cats)
    });
  }
}
