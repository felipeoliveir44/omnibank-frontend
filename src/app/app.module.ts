import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//MUI
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';

import {MatMenuModule} from '@angular/material/menu';



//Pagina
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FooterComponent } from './footer/footer.component';
import { CadastrocartaoComponent } from './cadastrocartao/cadastrocartao.component';
import { CadastrocompraComponent } from './cadastrocompra/cadastrocompra.component';
import { AlterarlimitecartaoComponent } from './alterarlimitecartao/alterarlimitecartao.component';
import { ListagemcartaoComponent } from './listagemcartao/listagemcartao.component';
import { CadastrologinComponent } from './cadastrologin/cadastrologin.component';


@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    ClientesComponent,
      FooterComponent,
      CadastrocartaoComponent,
      CadastrocompraComponent,
      AlterarlimitecartaoComponent,
      ListagemcartaoComponent,
      CadastrologinComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDividerModule,
    MatCardModule,
    ReactiveFormsModule,
    NgIf,
    MatMenuModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class ToolbarBasicExample {}
