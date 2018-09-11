import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowsersModule } from '../../modules/browsers/browsers.module';
import { LayoutsModule } from '../../modules/layouts/layouts.module';
import { MaterialModules } from '../../modules/material/material.module';
import { FormsModule } from '@angular/forms';

export const TestingModules = [
  RouterTestingModule,
  HttpClientTestingModule,
  BrowsersModule,
  LayoutsModule,
  MaterialModules,
  FormsModule
];
