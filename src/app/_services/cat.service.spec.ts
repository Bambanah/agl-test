import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CatService } from './cat.service';
import { Cats } from '../_models/cats';
import { Person } from '../_models/people';

describe('Cat Service', () => {
  let service: CatService, httpTestingController: HttpTestingController;
  let dummyCatsData: Cats;
  let dummyPeopleData: Person[];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CatService],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CatService);
  });

  beforeEach(() => {
    service = TestBed.inject(CatService);

    dummyCatsData = {
      male: ['Max'],
      female: ['Garfield', 'Simba'],
    } as Cats;

    dummyPeopleData = [
      {
        name: 'Jennifer',
        gender: 'Female',
        age: 18,
        pets: [
          {
            name: 'Garfield',
            type: 'Cat',
          },
          {
            name: 'Spot',
            type: 'Dog',
          },
        ],
      },
      {
        name: 'Steve',
        gender: 'Male',
        age: 45,
        pets: null,
      },
      {
        name: 'Fred',
        gender: 'Male',
        age: 40,
        pets: [
          {
            name: 'Max',
            type: 'Cat',
          },
        ],
      },
      {
        name: 'Alice',
        gender: 'Female',
        age: 64,
        pets: [
          {
            name: 'Simba',
            type: 'Cat',
          },
        ],
      },
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get people', () => {
    service.getPeople().subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpTestingController.expectOne(service.apiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(dummyPeopleData);
  });

  it('should return expected number of people', () => {
    service.getPeople().subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res.length).toEqual(4);
    });

    const req = httpTestingController.expectOne(service.apiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(dummyPeopleData);
  });

  it('should return expected people', () => {
    service.getPeople().subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res).toEqual(dummyPeopleData);
    });

    const req = httpTestingController.expectOne(service.apiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(dummyPeopleData);
  });

  it('should get cats', () => {
    service.getCats().subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpTestingController.expectOne(service.apiUrl);

    expect(req.request.method).toEqual('GET');
    req.flush(dummyPeopleData);
  });

  it('should get correct number of male cats', () => {
    service.getCats().subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res.male.length).toEqual(1);
    });

    const req = httpTestingController.expectOne(service.apiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(dummyPeopleData);
  });

  it('should get correct number of female cats', () => {
    service.getCats().subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res.female.length).toEqual(2);
    });

    const req = httpTestingController.expectOne(service.apiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(dummyPeopleData);
  });

  it('returns expected cats', () => {
    service.getCats().subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res).toEqual(dummyCatsData);
    });

    const req = httpTestingController.expectOne(service.apiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(dummyPeopleData);
  });

  it('should only return cats', () => {
    service.getCats().subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res.male.includes('Spot')).toBeFalse();
      expect(res.female.includes('Spot')).toBeFalse();
    });

    const req = httpTestingController.expectOne(service.apiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(dummyPeopleData);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
