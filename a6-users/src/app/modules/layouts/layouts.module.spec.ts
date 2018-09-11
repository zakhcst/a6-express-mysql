import { LayoutsModule } from './layouts.module';

describe('LayoutsModule', () => {
  let layoutsModule = LayoutsModule;

  beforeEach(() => {
    layoutsModule = LayoutsModule;
  });

  it('should create an instance', () => {
    expect(layoutsModule).toBeTruthy();
  });
});
