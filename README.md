# AGL Developer Test - Lachlan Underhill

This Angular app fetches a collection of people and their pets from a [JSON web service](http://agl-developer-test.azurewebsites.net/people.json), and displays all cats in alphabetical order under a heading of the gender of their owner.

### Example

| Male   | Female   |
| :----- | :------- |
| Angel  | Garfield |
| Molly  | Gizmo    |
| Tigger | Jasper   |

## Approach

* Angular service is created to fetch cats data.
* API request and data cleaning occurs in different functions: `getPeople` and `getCats` with the latter sorting the data returned by the former.
* The `getCats` function, when called, returns an Observable with a pre-defined structure: `{ male: [], female: [] }`.
* When the http request (from `getPeople`) is completed, all cats are extracted from the data and sorted alphabetically in their relevant gender list.
* After sorting the cats data, the Observable returns the cat data and completes.
* The completion of the cats Observable as called by the App component will toggle an `isLoaded` boolean and display the information.
* Separate components are used to display each sorted gender list, with the gender and list of cats being passed as inputs to those components.

### Unit testing

[Karma](https://karma-runner.github.io) is used for unit testing. At time of writing, unit tests have full 100% code coverage. `npm run test` or `yarn test` to run tests.

### Colour Scheme

The colour scheme used is based on the [Dracula](https://draculatheme.com/) theme.

