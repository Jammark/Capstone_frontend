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
import { DettaglioMetaTuristicaComponent } from './components/catalogo/dettaglio-meta-turistica/dettaglio-meta-turistica.component';
import { MetaTuristicaComponent } from './components/catalogo/meta-turistica/meta-turistica.component';
import { DettaglioCityComponent } from './components/catalogo/dettaglio-city/dettaglio-city.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    DettaglioMetaTuristicaComponent,
    MetaTuristicaComponent,
    DettaglioCityComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
 //   MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule
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
