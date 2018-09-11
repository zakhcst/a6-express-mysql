import { TestBed, inject } from '@angular/core/testing';
import { TestingModules } from '../modules/testing/testing.module';

import { UserDetailsService } from './user-details.service';

describe('UserDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ UserDetailsService ],
      imports: [ TestingModules ]
    });
  });

  it('should be created', inject([UserDetailsService], (service: UserDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
