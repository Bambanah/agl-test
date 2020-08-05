import {
  TestBed,
  async,
  ComponentFixture,
  fakeAsync,
} from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';

import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { AppComponent } from './app.component';
import { CatListComponent } from './cats/cat-list/cat-list.component';

import { CatService } from './_services/cat.service';
import { Cats } from './_models/cats';

describe('App Component', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;

  let dummyCatData: Cats;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AppComponent, CatListComponent],
      providers: [CatService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    // Dummy data to be used for testing
    dummyCatData = {
      male: ['Garfield'],
      female: ['Max'],
    };

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a heading`, () => {
    component.cats = dummyCatData;
    expect(component.title).toEqual('Cool Cats and Kittens');
  });

  it('should have a loading variable', () => {
    expect(component.isLoaded).toBeDefined();
  });

  it('should start as unloaded', () => {
    expect(component.isLoaded).toBeFalse();
  });

  describe('after receiving cat data from service', () => {
    beforeEach(() => {
      // Create service element
      const service = fixture.debugElement.injector.get(CatService);

      // Return fake data from getCats method
      spyOn(service, 'getCats').and.callFake(() => {
        return new Observable<Cats>((observer) => {
          observer.next(dummyCatData);
          observer.complete();
        });
      });

      // Run ngOnInit function (runs getCats)
      component.ngOnInit();
    });

    it('should update local cats array', fakeAsync(() => {
      expect(component.cats).toEqual(dummyCatData);
    }));

    it('should toggle loading', fakeAsync(() => {
      expect(component.isLoaded).toBeTrue();
    }));
  });

  describe('when loaded', () => {
    beforeEach(() => {
      component.isLoaded = true;
      component.cats = dummyCatData;
      fixture.detectChanges();
    });

    it('should display heading', () => {
      expect(de.query(By.css('h1')).nativeElement.innerText).toBe(
        'Cool Cats and Kittens'
      );
    });

    it('should display cat lists', () => {
      expect(de.query(By.css('h1'))).toBeTruthy();
    });
  });

  describe('when not loaded yet', () => {
    beforeEach(() => {
      component.cats = dummyCatData;
    });

    it('should hide cat lists', () => {
      expect(de.query(By.css('.cat-list'))).toBeFalsy();
    });

    it('should hide heading', () => {
      expect(de.query(By.css('h1'))).toBeFalsy();
    });
  });
});
