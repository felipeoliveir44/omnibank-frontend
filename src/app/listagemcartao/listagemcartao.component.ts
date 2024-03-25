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
  cpfDigitado: string = '';
  numeroDigitado: string = '';
  cartaoSelecionado: Cartao[] = [];

  constructor(private cartaoService: CartaoserviceService, private _snackBar: MatSnackBar, private router:Router) {}

  ngOnInit(): void {
    this.carregarCartoes();
  }

  carregarCartoes(): void {
    this.cartaoService.listarCartao(this.paginaAtual).subscribe(
      (page: Page<Cartao>) => {
        this.paginaCartoes = page;
        this.cartoesSalvos = page.content; // Salva os dados originais
        this.cartoes = page.content;
        console.log('Página de Cartões:', this.cartoes);
      },
      (erro) => {
        this.exibirSnackBarErro('Erro ao carregar os cartões. Por favor, tente novamente.');
      }
    );
  }

  buscarCartoesPorCpf(): void {
    if (this.cpfDigitado.trim() !== '') {
      this.cartaoService.listarCartaoCpf(this.cpfDigitado).subscribe(
        (page: Page<Cartao>) => {
          this.cartoes = page.content;
          console.log('Cartões encontrados por CPF:', this.cartoes);
        },
        (erro) => {
          this.exibirSnackBarErro('Erro ao buscar cartões por CPF. Por favor, tente novamente.');
        }
      );
    } else {
      this.cartoes = this.cartoesSalvos; // Retorna os dados originais se o CPF estiver vazio
    }
  }

  buscarCartoesPorNumero(): void {
    if (this.numeroDigitado.trim() !== '') {
      this.cartaoService.listarCartaoNumero(this.numeroDigitado).subscribe(
        (page: Page<Cartao>) => {
          this.cartoes = page.content;
          console.log('Cartões encontrados por número:', this.cartoes);
        },
        (erro) => {
          this.exibirSnackBarErro('Erro ao buscar cartões por número. Por favor, tente novamente.');
        }
      );
    } else {
      this.cartoes = this.cartoesSalvos; // Retorna os dados originais se o número do cartão estiver vazio
    }
  }

  executarPesquisa(): void {
    if (this.cpfDigitado.trim() !== '') {
      this.buscarCartoesPorCpf();
    } else if (this.numeroDigitado.trim() !== '') {
      this.buscarCartoesPorNumero();
    } else {
      this.exibirSnackBarErro('Preencha pelo menos um dos campos.');
      this.cartoes = this.cartoesSalvos; // Retorna os valores originais
    }
  }

  atualizarStatus(cartaoId: number, novoStatus: number): void {
    this.cartaoService.atualizarStatusCartao(cartaoId, novoStatus).subscribe(
      (response) => {
        console.log('Status atualizado com sucesso!');
        this.carregarCartoes(); // Atualiza a lista após a atualização do status
        
      },
      (erro) => {
        this.exibirSnackBarErro('Erro ao atualizar o status do cartão. Por favor, tente novamente.');
      }
    );
  }

  enviarDadosParaProximaPagina(cartao: Cartao): void {
    // Armazena o cartão selecionado na sessionStorage
    sessionStorage.setItem('cartaoSelecionado', JSON.stringify(cartao));

    // Navega para a próxima página
    this.router.navigateByUrl('/alterarlimitecartao');
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
