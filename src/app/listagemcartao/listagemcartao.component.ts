import { Component } from '@angular/core';
import { CartaoserviceService } from '../servicos/cartao/cartao.service';
import { Cartao, CartaoResponse } from '../models/cartao';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, debounceTime, map, startWith, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Page } from '../models/page';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-listagemcartao',
  templateUrl: './listagemcartao.component.html',
  styleUrls: ['./listagemcartao.component.scss']
})
export class ListagemcartaoComponent {
  paginaAtual: number = 0;
  paginaCartoes: Page<Cartao> = { content: [], totalPages: 0, totalElements: 0 };
  cartoes: Cartao[] = [];
  cartoesSalvos: Cartao[] = [];
  filtro!:Cartao[];
  cpfDigitado: string = '';
  numeroDigitado: string = '';
  cartaoSelecionado: Cartao[] = [];

  constructor(private cartaoService: CartaoserviceService, private _snackBar: MatSnackBar, private router:Router) {
  }

  ngOnInit(): void {
    this.carregarCartoes();
    
  }

  carregarCartoes(): void {
    this.cartaoService.listarCartao(this.paginaAtual).subscribe(
      (page: Page<Cartao>) => {
        this.paginaCartoes = page;
        this.cartoesSalvos = page.content; // Salva os dados originais
        this.cartoes = page.content;
        this.filtro = page.content
        console.log('Página de Cartões:', this.cartoes);
        console.log("Filtros: ", this.filtro)
      },
      (erro) => {
        this.exibirSnackBarErro('Erro ao carregar os cartões. Por favor, tente novamente.');
      }
    );
  }

  searchNumero(e: Event) {
    const target = e.target as HTMLInputElement
    const value = target.value
    this.cartoes = this.filtro.filter((cartoes)=>{
      return cartoes.numeroCartao?.includes(value);
    })
  }

  searchCpf(e: Event) {
    const target = e.target as HTMLInputElement
    const value = target.value
    this.cartoes = this.filtro.filter((cartoes)=>{
      return cartoes.cpfCliente.includes(value);
    })
  }

  atualizarStatus(cartaoId: number, novoStatus: number): void {
    this.cartaoService.atualizarStatusCartao(cartaoId, novoStatus).subscribe(
      (response) => {
        this.exibirSnackBarErro("Status alterado com sucesso!")
        this.carregarCartoes(); // Atualiza a lista após a atualização do status
        
      },
      (erro) => {
        this.exibirSnackBarErro("Erro! Tente novamente")
      }
    );
  }

  enviarDadosParaProximaPagina(cartao: Cartao): void {
    // Armazena o cartão selecionado na sessionStorage
    sessionStorage.setItem('cartaoSelecionado', JSON.stringify(cartao));

    // Navega para a próxima página
    this.router.navigateByUrl('/alterarlimitecartao');
  }

  enviarDadosParaPaginaFatura(cartao: Cartao): void {
    // Armazena o cartão selecionado na sessionStorage
    sessionStorage.setItem('cartaoSelecionado', JSON.stringify(cartao));

    // Navega para a próxima página
    this.router.navigateByUrl('/visualizar-fatura');
  }
  
  private exibirSnackBarErro(mensagem: string): void {
    this._snackBar.open(mensagem, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
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
