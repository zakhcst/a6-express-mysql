import { TestBed, inject } from '@angular/core/testing';
import { TestingModules } from '../modules/testing/testing.module';

import { UsersService } from './users.service';

describe('UsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ UsersService ],
      imports: [ TestingModules ]
    });
  });

  it('should be created', inject([UsersService], (service: UsersService) => {
    expect(service).toBeTruthy();
  }));
});
