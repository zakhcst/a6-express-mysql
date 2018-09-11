import { TestBed, inject } from '@angular/core/testing';
import { TestingModules } from '../modules/testing/testing.module';
import { UserRolesService } from './user-roles.service';

describe('UserRolesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ UserRolesService ],
      imports: [ TestingModules ]
    });
  });

  it('should be created', inject([UserRolesService], (service: UserRolesService) => {
    expect(service).toBeTruthy();
  }));
});
