import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DebugElement } from '@angular/core';

import { CatListComponent } from './cat-list.component';

describe('Cat List Component', () => {
  let component: CatListComponent;
  let fixture: ComponentFixture<CatListComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CatListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatListComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    component.cats = ['Garfield', 'Borris', 'Jellie'];
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('male cats', () => {
    beforeEach(() => {
      component.gender = 'male';
      fixture.detectChanges();
    });

    it('should display male heading', () => {
      expect(de.query(By.css('.male-header')).nativeElement.innerText).toBe(
        'Male'
      );
    });

    it('should display cats belonging to males', () => {
      expect(de.queryAll(By.css('.male-cat')).length).toBeGreaterThan(0);
    });
  });

  describe('female cats', () => {
    beforeEach(() => {
      component.gender = 'female';
      fixture.detectChanges();
    });

    it('should display female heading', () => {
      expect(de.query(By.css('.female-header')).nativeElement.innerText).toBe(
        'Female'
      );
    });

    it('should display cats belonging to females', () => {
      expect(de.queryAll(By.css('.female-cat')).length).toBeGreaterThan(0);
    });
  });
});
