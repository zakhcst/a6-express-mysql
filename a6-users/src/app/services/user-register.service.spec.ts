import { TestBed, inject } from '@angular/core/testing';
import { TestingModules } from '../modules/testing/testing.module';

import { RegisterService } from './user-register.service';

describe('RegisterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ RegisterService ],
      imports: [ TestingModules ]
    });
  });

  it('should be created', inject([RegisterService], (service: RegisterService) => {
    expect(service).toBeTruthy();
  }));
});
