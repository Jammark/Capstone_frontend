import { TestBed } from '@angular/core/testing';

import { AlloggiService } from './alloggi.service';

describe('AlloggiService', () => {
  let service: AlloggiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlloggiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
