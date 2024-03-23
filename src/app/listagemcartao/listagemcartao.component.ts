import { Component } from '@angular/core';
import { CartaoserviceService } from '../servicos/cartao/cartao.service';
import { Cartao, CartaoResponse } from '../models/cartao';

import { Observable, map, startWith, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Page } from '../models/page';

@Component({
  selector: 'app-listagemcartao',
  templateUrl: './listagemcartao.component.html',
  styleUrls: ['./listagemcartao.component.scss']
})
export class ListagemcartaoComponent {
  paginaAtual: number = 0; // Exemplo: página inicial é 1
  paginaCartoes: Page<Cartao> = { content: [], totalPages: 0, totalElements: 0 }; // Estrutura inicial da página de cartões
  cartoes: Cartao[] = []

  constructor(private cartaoService: CartaoserviceService) {}

  ngOnInit(): void {
    this.carregarCartoes();
  }

  carregarCartoes(): void {
    this.cartaoService.listarCartao(this.paginaAtual).subscribe(
      (page: Page<Cartao>) => {
        this.paginaCartoes = page;
        console.log('Página de Cartões:', this.paginaCartoes.content);
        this.cartoes = this.paginaCartoes.content;
        console.log ("cartoes: ", this.cartoes)
      },
      (erro) => {
        console.error('Erro ao carregar cartões:', erro);
      }
    );
  }

  irParaPrimeiraPagina(): void {
    this.paginaAtual = 0;
    this.carregarCartoes();
  }
  
  irParaPaginaAnterior(): void {
    this.paginaAtual--;
    this.carregarCartoes();
  }
  
  irParaProximaPagina(): void {
    this.paginaAtual++;
    this.carregarCartoes();
  }
  
  irParaUltimaPagina(): void {
    this.paginaAtual = this.paginaCartoes.totalPages;
    this.carregarCartoes();
  }
}
