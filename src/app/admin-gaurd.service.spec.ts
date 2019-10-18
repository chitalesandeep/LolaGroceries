import { TestBed } from '@angular/core/testing';

import { AdminGaurd } from './admin-gaurd.service';

describe('AdminGaurdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminGaurd = TestBed.get(AdminGaurd);
    expect(service).toBeTruthy();
  });
});
