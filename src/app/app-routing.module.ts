import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { ClientesComponent } from './clientes/clientes.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path:'', component : HomeComponent},
  {path:'cabecalho', component : CabecalhoComponent},
  {path:'clientes',component: ClientesComponent},
  {path: 'login', component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
