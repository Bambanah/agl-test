import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  // Display loading icon when fetching data
  loading = true;
  title = 'Cool Cats and Kittens';

  // Initialise cats array
  cats: Object = {
    male: [],
    female: [],
  };

  ngOnInit() {
    // URL of json endpoint
    const url = 'http://agl-developer-test.azurewebsites.net/people.json';

    // Initialise people array so that we can iterate over
    // it, since the response will be an Object
    let people: any = [];

    // Http request to fetch JSON data
    this.http.get(url).subscribe((res) => {
      // Object -> Array
      people = res;

      // Extract all cats from json data
      people.forEach((person: any) => {
        // Only interested in people with pets
        if (person.pets) {
          person.pets.forEach((pet: any) => {
            // Only save cats
            if (pet.type == 'Cat') {
              // If a cat is found, add it to the relevant gender array
              this.cats[person.gender.toLowerCase()].push(pet.name);
            }
          });
        }
      });

      // Sort male and female arrays
      this.cats['male'].sort();
      this.cats['female'].sort();

      // Data loaded
      this.loading = false;
    });
  }
}
