import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cats } from '../_models/cats';
import { Person } from '../_models/person';

@Injectable({
  providedIn: 'root',
})
export class CatService {
  constructor(private http: HttpClient) {}

  apiUrl = 'https://agl-developer-test.azurewebsites.net/people.json';

  // Get all people returned by API
  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }

  getCats(): Observable<Cats> {
    // Create observable to be returned while fetching json data
    const catObservable = new Observable<Cats>((observer) => {
      // Initialise empty object
      let cats: Cats = { male: [], female: [] };

      // Subscribe to getPeople helper function
      this.getPeople().subscribe((people) => {
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

        cats['male'].sort(); // Sort male cats
        cats['female'].sort(); // Sort female cats

        observer.next(cats); // Gimme them cats
        observer.complete(); // Close observable
      });
    });

    return catObservable;
  }
}
