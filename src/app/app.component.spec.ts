import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppComponent } from './app.component';
import { LoadingComponent } from './loading/loading.component';
import { CatListComponent } from './cats/cat-list/cat-list.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AppComponent, LoadingComponent, CatListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    component.cats = {
      male: [],
      female: [],
    };
    component.loading = false;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a heading`, () => {
    expect(component.title).toEqual('Cool Cats and Kittens');
  });

  it('should render title', () => {
    expect(de.query(By.css('h1')).nativeElement.innerText).toBe(
      'Cool Cats and Kittens'
    );
  });
});
