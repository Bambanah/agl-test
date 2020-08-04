import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CatListComponent } from './cat-list.component';
import { DebugElement } from '@angular/core';

describe('CatListComponent', () => {
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

    component.cats = ['Garfield', 'Garfield', 'Jellie'];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cats belonging to males', () => {
    component.gender = 'male';
    fixture.detectChanges();
    expect(de.queryAll(By.css('.male-cat')).length).toBeGreaterThan(0);
  });

  it('should display cats belonging to females', () => {
    component.gender = 'female';
    fixture.detectChanges();
    expect(de.queryAll(By.css('.female-cat')).length).toBeGreaterThan(0);
  });
});
