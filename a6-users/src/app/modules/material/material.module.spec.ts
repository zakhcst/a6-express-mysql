import { MaterialModules } from './material.module';

describe('MaterialModule', () => {
  let materialModules;

  beforeEach(() => {
    materialModules = MaterialModules;
  });

  it('should create an instance', () => {
    expect(materialModules).toBeTruthy();
  });
});
