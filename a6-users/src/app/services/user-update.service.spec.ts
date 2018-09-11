import { TestBed, inject } from '@angular/core/testing';
import { TestingModules } from '../modules/testing/testing.module';
import { UserUpdateService } from './user-update.service';

describe('UserUpdateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ UserUpdateService ],
      imports: [ TestingModules ]
    });
  });

  it('should be created', inject([UserUpdateService], (service: UserUpdateService) => {
    expect(service).toBeTruthy();
  }));
});
