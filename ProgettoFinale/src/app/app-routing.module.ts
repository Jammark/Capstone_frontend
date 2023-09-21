import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component.component';
import { AuthGuard } from './components/auth/auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { LoggedGuard } from './components/auth/logged.guard';
import { RegisterComponent } from './components/auth/register/register.component';
import { CatalogoMeteTuristicheComponent } from './components/catalogo/catalogo-mete-turistiche/catalogo-mete-turistiche.component';
import { CatatalogoAlloggiComponent } from './components/catalogo/catatalogo-alloggi/catatalogo-alloggi.component';
import { RicercaTrasportoComponent } from './components/catalogo/ricerca-trasporto/ricerca-trasporto.component';
import { DettaglioMetaTuristicaComponent } from './components/catalogo/dettaglio-meta-turistica/dettaglio-meta-turistica.component';
import { MetaTuristicaComponent } from './components/catalogo/meta-turistica/meta-turistica.component';
import { DettaglioCityComponent } from './components/catalogo/dettaglio-city/dettaglio-city.component';
import { SaldoComponent } from './components/saldo/saldo.component';
import { RiepilogoComponent } from './components/riepilogo/riepilogo.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
   // canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedGuard]
},
{
  path: 'register',
  component: RegisterComponent,
  canActivate: [LoggedGuard]
},
{
  path:'mete',
  component: CatalogoMeteTuristicheComponent,
  canActivate: [AuthGuard],

},
{
  path:'saldo',
  component: SaldoComponent,
  canActivate: [AuthGuard],

},
{
  path:'riepilogo',
  component: RiepilogoComponent,
  canActivate: [AuthGuard],

},
{
  path:'meta',
  component: MetaTuristicaComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: 'dest/:id',
      component: DettaglioMetaTuristicaComponent
    },
    {
      path: 'citta/:id',
      component: DettaglioCityComponent,
      children: [
        {
          path: 'alloggi/:id',
          component: CatatalogoAlloggiComponent
        }
      ]
    },

    {
      path: 'alloggi/:id',
      component: CatatalogoAlloggiComponent
    },
    {
      path: 'trasporti',
      component: RicercaTrasportoComponent
    },

  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
