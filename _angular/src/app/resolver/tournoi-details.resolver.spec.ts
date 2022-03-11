import { TestBed } from '@angular/core/testing';

import { TournoiDetailsResolver } from './tournoi-details.resolver';

describe('TournoiDetailsResolver', () => {
  let resolver: TournoiDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TournoiDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
