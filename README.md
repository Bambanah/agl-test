# AGL Developer Test - Lachlan Underhill

This Angular app fetches a collection of people and their pets from a [JSON web service](http://agl-developer-test.azurewebsites.net/people.json), and displays all cats in alphabetical order under a heading of the gender of their owner.

### Example

| Male   | Female   |
| :----- | :------- |
| Angel  | Garfield |
| Molly  | Gizmo    |
| Tigger | Jasper   |

## Approach

* The Angular `HttpClient` module is used to fetch the json data from the API, saving it as a list of objects (people).
* This list is then sifted through and every cat that is found is saved to an object `{ male: [], female: []}` for easy reference.
* Separate components are used to display each sorted gender list, with the gender and list of cats being passed as inputs.
* While this is going on, a loading component is displayed to prevent the content from jumping around while the DOM is being populated.

### Unit testing

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Colour Scheme

The colour scheme used is based on the [Dracula](https://draculatheme.com/) theme.

