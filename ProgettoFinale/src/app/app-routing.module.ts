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

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
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
  children: [
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
