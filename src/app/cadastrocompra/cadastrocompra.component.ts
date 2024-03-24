import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, switchMap } from 'rxjs';
import { Cartao } from '../models/cartao';
import { CompraService } from '../servicos/compra/compra.service';
import { Cliente } from '../models/cliente';
import { Categoria } from '../models/categoria';

@Component({
  selector: 'app-cadastrocompra',
  templateUrl: './cadastrocompra.component.html',
  styleUrls: ['./cadastrocompra.component.scss']
})
export class CadastrocompraComponent implements OnInit {

  cartaoControl = new FormControl();
  cartaoFiltrados$: Observable<any[]>;
  cartaoSelecionado!: number;

  categoriaControl = new FormControl();
  categoriaFiltrada$: Observable<any[]>;
  categoriaSelecionada!: any;

  cartaoId: number = 0;
  categoria: string = '';
  estabelecimento: string = '';
  valor:number = 0;

  constructor(private compraService: CompraService) {

    this.categoriaFiltrada$ = this.categoriaControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.compraService.buscarCategoriaAutoComplete())
    );

    this.cartaoFiltrados$ = this.cartaoControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.compraService.buscarCartaoAutoComplete(value))
    );
  }

  ngOnInit(): void {

    this.categoriaFiltrada$ = this.categoriaControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.compraService.buscarCategoriaAutoComplete())
    );

    this.cartaoFiltrados$ = this.cartaoControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.compraService.buscarCartaoAutoComplete(value))
    );

    
  }

  selecionarCartao(cartao: Cartao): void {
    if (cartao) {
      this.cartaoSelecionado = cartao.id;
      console.log(this.cartaoSelecionado);
       // Salva o ID do cliente selecionado na variável
    } else {
      this.cartaoSelecionado = 0; // Limpa o ID se nenhum cliente for selecionado
    }
  }

  exibirCartao(cartao: Cartao): string {
    return cartao ? `${cartao.numeroCartao} (ID: ${cartao.limiteCartao})` : '';
  }


  selecionarCategoria(categoria: Categoria): void {
    if (categoria) {
      this.categoriaSelecionada = categoria.nome;
      console.log(this.categoriaSelecionada);
       // Salva o ID do cliente selecionado na variável
    } else {
      this.categoriaSelecionada = 0; // Limpa o ID se nenhum cliente for selecionado
    }
  }

  exibirCategoria(categoria: Categoria): string {
    return categoria ? `${categoria.id} (ID: ${categoria.nome})` : '';
  }
  
  realizarCompra(valor: number, categoria: string, estabelecimento: string, cartaoId: number): void {
    this.compraService.cadastrar(valor, categoria, estabelecimento, this.cartaoSelecionado).subscribe(
      (response) => {

        console.log('Status atualizado com sucesso!');
      },
      (erro) => {
        console.log("Erro", erro);
      }
    );
  }

}
