import {
  TestBed,
  async,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppComponent } from './app.component';
import { LoadingComponent } from './loading/loading.component';
import { CatListComponent } from './cats/cat-list/cat-list.component';
import { By } from '@angular/platform-browser';
import { Cats } from './_models/cats';
import { CatService } from './_services/cat.service';
import { of, scheduled, Observable } from 'rxjs';

describe('App Component', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;

  let dummyCatData: Cats;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AppComponent, LoadingComponent, CatListComponent],
      providers: [CatService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

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
    expect(component.loading).toBeDefined();
  });

  it('should start as unloaded', () => {
    expect(component.loading).toBeTrue();
  });
  describe('after receiving cat data from service', () => {
    beforeEach(() => {
      const service = fixture.debugElement.injector.get(CatService);
      spyOn(service, 'getCats').and.callFake(() => {
        return new Observable<Cats>((observer) => {
          observer.next(dummyCatData);
          observer.complete();
        });
      });

      component.ngOnInit();
    });

    it('should update local cats array', fakeAsync(() => {
      expect(component.cats).toEqual(dummyCatData);
    }));

    it('should toggle loading', fakeAsync(() => {
      expect(component.loading).toBeFalse();
    }));
  });

  describe('when loaded', () => {
    beforeEach(() => {
      component.loading = false;
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

    it('should hide loading component', () => {
      expect(de.query(By.css('.spinner-container'))).toBeFalsy();
    });
  });

  describe('when not loaded yet', () => {
    beforeEach(() => {
      component.cats = dummyCatData;
    });

    it('should display loading component', () => {
      expect(de.query(By.css('.spinner-container'))).toBeTruthy();
    });

    it('should hide cat lists', () => {
      expect(de.query(By.css('.cat-list'))).toBeFalsy();
    });

    it('should hide heading', () => {
      expect(de.query(By.css('h1'))).toBeFalsy();
    });
  });
});
