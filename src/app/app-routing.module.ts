import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { ClientesComponent } from './clientes/clientes.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { CadastrocartaoComponent } from './cadastrocartao/cadastrocartao.component';
import { CadastrocompraComponent } from './cadastrocompra/cadastrocompra.component';
import { AlterarlimitecartaoComponent } from './alterarlimitecartao/alterarlimitecartao.component';
import { ListagemcartaoComponent } from './listagemcartao/listagemcartao.component';


const routes: Routes = [
  {path:'', component : HomeComponent},
  {path:'cabecalho', component : CabecalhoComponent},
  {path:'clientes',component: ClientesComponent},
  {path: 'login', component : LoginComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'cadastrocartao', component: CadastrocartaoComponent},
  {path: 'cadastrocompra', component: CadastrocompraComponent},
  {path: 'alterarlimitecartao', component: AlterarlimitecartaoComponent},
  {path: 'listagemcartao', component: ListagemcartaoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
