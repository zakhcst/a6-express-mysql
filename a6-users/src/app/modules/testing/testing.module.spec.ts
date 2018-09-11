import { TestingModules } from './testing.module';

describe('TestingModule', () => {
  let testingModule = TestingModules;

  beforeEach(() => {
    testingModule = TestingModules;
  });

  it('should create an instance', () => {
    expect(testingModule).toBeTruthy();
  });
});
