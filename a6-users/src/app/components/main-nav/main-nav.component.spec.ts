
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowsersModule } from '../../modules/browsers/browsers.module';
import { LayoutsModule } from '../../modules/layouts/layouts.module';
import { MaterialModules } from '../../modules/material/material.module';

import { MainNavComponent } from './main-nav.component';

describe('MainNavComponent', () => {
  let component: MainNavComponent;
  let fixture: ComponentFixture<MainNavComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainNavComponent ],
      imports: [
        BrowsersModule,
        LayoutsModule,
        MaterialModules
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
