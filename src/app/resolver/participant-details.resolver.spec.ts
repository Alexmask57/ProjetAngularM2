import { TestBed } from '@angular/core/testing';

import { ParticipantDetailsResolver } from './participant-details.resolver';

describe('ParticipantDetailsResolver', () => {
  let resolver: ParticipantDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ParticipantDetailsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
