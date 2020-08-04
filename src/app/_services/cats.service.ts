import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatsService {
  constructor(private http: HttpClient) {}

  apiUrl = 'http://agl-developer-test.azurewebsites.net/people.json';

  async getCats() {
    // Initialise cats object
    let cats: Object = {
      male: [],
      female: [],
    };

    // Get http request as promise, so we can wait for it
    await this.http
      .get<Object>(this.apiUrl)
      .toPromise()
      .then((res) => {
        // Response contains an object of people and their pets
        const people = res;

        // Extract all cats from json data
        Object.values(people).map((person) => {
          // Only interested in people with pets
          if (person.pets) {
            person.pets.forEach((pet: any) => {
              // Only save cats
              if (pet.type == 'Cat') {
                // If a cat is found, add it to the relevant gender array
                cats[person.gender.toLowerCase()].push(pet.name);
              }
            });
          }
        });

        // Sort male and female arrays
        cats['male'].sort();
        cats['female'].sort();
      });

    // Gimme them cats
    return cats;
  }
}
