import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.scss'],
})
export class CatListComponent {
  constructor() {}

  @Input() gender: string;
  @Input() cats: string[];
}
