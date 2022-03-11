import { TestBed } from '@angular/core/testing';

import { SsbCharactersService } from './ssb-characters.service';

describe('SsbCharactersService', () => {
  let service: SsbCharactersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SsbCharactersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
