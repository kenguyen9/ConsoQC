import { InformationComponent } from './information/information.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'Connexion', component: LoginComponent
  },
  {
    path:'Tableau de bord', component: DashboardComponent
  },
  {
    path: 'Informations', component: InformationComponent
  },
  {
    path: '', redirectTo: 'Connexion', pathMatch:'full'
  },
  {
    path: '**', redirectTo: 'Connexion', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
