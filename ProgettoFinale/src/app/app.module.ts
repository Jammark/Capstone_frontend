import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home-component/home-component.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoggingInterceptor } from './logging.interceptor';
import { TokenInterceptor } from './components/auth/token.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CatalogoMeteTuristicheComponent } from './components/catalogo/catalogo-mete-turistiche/catalogo-mete-turistiche.component';
import { CatatalogoAlloggiComponent } from './components/catalogo/catatalogo-alloggi/catatalogo-alloggi.component';
import { RicercaTrasportoComponent } from './components/catalogo/ricerca-trasporto/ricerca-trasporto.component';
import { RouterModule, UrlSerializer } from '@angular/router';
import { CustomUrlSerializer } from './util/custom-url-serializer';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CatalogoMeteTuristicheComponent,
    CatatalogoAlloggiComponent,
    RicercaTrasportoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: UrlSerializer, useClass: CustomUrlSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
