import { Component, OnInit } from '@angular/core';
import { RelatoriosService } from '../servicos/relatorios/relatorios.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, switchMap } from 'rxjs';
import { Cartao } from '../models/cartao';
import { DatePipe } from '@angular/common';
import { RelatorioCategoria } from '../models/relatorioCategoria';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss'],
  providers: [DatePipe] 
})
export class RelatoriosComponent implements OnInit {
  cartaoControl = new FormControl();
  cartaoFiltrados$: Observable<any[]>;
  cartaoSelecionado!: number;

  dataInicio!: Date;
  dataFinal!: Date;
  cartaoId!: number;

  dados: RelatorioCategoria[] = [];

  constructor(private relatorioService: RelatoriosService, private datePipe: DatePipe) { 
    this.cartaoFiltrados$ = this.cartaoControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.relatorioService.buscarCartaoAutoComplete(value))
    );
  }

  ngOnInit() {
    this.cartaoFiltrados$ = this.cartaoControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.relatorioService.buscarCartaoAutoComplete(value))
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


  listarDados(idCartao: number, dataInicio: Date, dataFinal: Date) {
    const dataInicioFormatada = this.formatarData(dataInicio);
    const dataFinalFormatada = this.formatarData(dataFinal);
  
    this.relatorioService.listar(this.cartaoSelecionado, dataInicioFormatada, dataFinalFormatada).subscribe(
      (dados: RelatorioCategoria[]) => {
        this.dados = dados;
        console.log('Dados recebidos:', dados);
  
        // Itera sobre cada objeto da lista de dados
        dados.forEach(item => {
          console.log('Objeto completo:', item);
          console.log('Objeto completo, json:', JSON.stringify(item)); // Imprime o objeto completo para ver as propriedades disponíveis
          console.log('Categoria:', item.nomeCategoria);
          console.log('Valor Gasto:', item.valorGasto);
        });
      },
      (erro) => {
        console.log("Erro ao obter os dados:", erro);
      }
    );
  }

  formatarData(data: Date): string {
    const ano = data.getFullYear();
    let mes = (data.getMonth() + 1).toString(); // O mês começa de 0, então é necessário adicionar 1
    if (mes.length === 1) {
        mes = '0' + mes; // Adiciona um zero à esquerda se o mês tiver apenas um dígito
    }
    const dia = data.getDate().toString().padStart(2, '0'); // Garante que o dia tenha dois dígitos

    return `${ano}-${mes}-${dia}`;
  }
}
