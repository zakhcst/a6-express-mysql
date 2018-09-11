import { TestBed, inject } from '@angular/core/testing';
import { TestingModules } from '../modules/testing/testing.module';

import { LoginService } from './user-login.service';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ LoginService ],
      imports: [ TestingModules ]
    });
  });

  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));
});
