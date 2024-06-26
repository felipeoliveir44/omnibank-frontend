import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
import {MatSelectModule} from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';





//Pagina
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { FooterComponent } from './footer/footer.component';
import { CadastrocartaoComponent } from './cadastrocartao/cadastrocartao.component';
import { CadastrocompraComponent } from './cadastrocompra/cadastrocompra.component';
import { AlterarlimitecartaoComponent } from './alterarlimitecartao/alterarlimitecartao.component';
import { ListagemcartaoComponent } from './listagemcartao/listagemcartao.component';
import { CadastrologinComponent } from './cadastrologin/cadastrologin.component';
import { CadastroclienteComponent } from './cadastrocliente/cadastrocliente.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { HttpClientModule } from '@angular/common/http';
import { ListagemclienteComponent } from './listagemcliente/listagemcliente.component';
import { VisualizarFaturaComponent } from './visualizar-fatura/visualizar-fatura.component';
import { DialogEditarComponent } from './listagemcliente/dialog-editar/dialog-editar.component';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
      FooterComponent,
      CadastrocartaoComponent,
      CadastrocompraComponent,
      AlterarlimitecartaoComponent,
      ListagemcartaoComponent,
      CadastrologinComponent,
      CadastroclienteComponent,
      RelatoriosComponent,
      ListagemclienteComponent,
      VisualizarFaturaComponent,
      DialogEditarComponent
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
    MatTabsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTableModule,
    MatGridListModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatListModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DatePipe,
    MatDialogModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class ToolbarBasicExample {}
