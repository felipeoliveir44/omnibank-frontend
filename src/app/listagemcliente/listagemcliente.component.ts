import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CadastroclienteComponent } from '../cadastrocliente/cadastrocliente.component';
import { ClientesService } from '../servicos/cliente/clientes.service';
import { Observable, Subscription, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, switchMap } from 'rxjs/operators';
import { Cliente } from '../models/cliente';
import { Page } from '../models/page';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditarComponent } from './dialog-editar/dialog-editar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagemcliente',
  templateUrl: './listagemcliente.component.html',
  styleUrls: ['./listagemcliente.component.scss'],
})
export class ListagemclienteComponent implements OnInit {
  paginaAtual: number = 0;
  paginaCartoes: Page<Cliente> = {
    content: [],
    totalPages: 0,
    totalElements: 0,
  };
  cliente: Cliente[] = [];
  clienteSelecionado: Cliente[] = [];

  constructor(
    private clienteService: ClientesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarCliente();
  }

  carregarCliente(): void {
    this.clienteService.listar(this.paginaAtual).subscribe(
      (page: Page<Cliente>) => {
        this.paginaCartoes = page;
        this.cliente = page.content;
        console.log('Página de Cartões:', this.cliente);
      },
      (erro) => {
        console.log('erro');
      }
    );
  }

  abrirDialog(cliente: Cliente): void {
    const clienteCopia = { ...cliente }; // Cria uma cópia do cliente
    const dialogRef = this.dialog.open(DialogEditarComponent, {
      width: '600px',
      data: { clienteCopia, cliente } // Passa a cópia do cliente como data para o dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Atualiza os dados do cliente original com os dados da cópia
        Object.assign(cliente, result);
      }
      console.log('Dialog fechado', result);
    });
  }

  desativarCliente(idCliente: number) {
    this.clienteService.desativarCliente(idCliente).subscribe(
      (response) => {
        this.exibirSnackBarErro("Cliente desativado com sucesso!")
        this.carregarCliente();
      },
      (erro) => {
        this.exibirSnackBarErro("Erro! Tente novamente")
      }
    );
  }

  ativarCliente(idCliente: number) {
    this.clienteService.ativarCliente(idCliente).subscribe(
      (response) => {
        this.exibirSnackBarErro("Cliente ativado com sucesso!");
        this.carregarCliente();
      },
      (erro) => {
        this.exibirSnackBarErro("Erro! Tente novamente")
      }
    );
  }

  private exibirSnackBarErro(mensagem: string): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

}
