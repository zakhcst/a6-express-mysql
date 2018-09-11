import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { TokenInterceptorService } from './services/token-interceptor.service';

import { BrowsersModule } from './modules/browsers/browsers.module';
import { LayoutsModule } from './modules/layouts/layouts.module';
import { MaterialModules } from './modules/material/material.module';

import { MainNavComponent } from './components/main-nav/main-nav.component';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [AppComponent, routingComponents, MainNavComponent],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowsersModule,
    LayoutsModule,
    FormsModule,
    MaterialModules
  ],
  exports: [],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
