import { Component, OnInit } from '@angular/core';
import { RelatoriosService } from '../servicos/relatorios/relatorios.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, switchMap } from 'rxjs';
import { Cartao } from '../models/cartao';
import { DatePipe } from '@angular/common';
import { RelatorioCategoria } from '../models/relatorioCategoria';
import { AcompanhamentoClienteService } from '../servicos/acompanhamentoCliente.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

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


  



  dataInicioAcompanhamentoCliente!:Date;
  dataFinalAcompanhamentoCliente!:Date;

  dadosAcompanhamentoClienteMaiorValor:any[] = [];
  dadosAcompanhamentoClienteSemCompra:any[] = [];
  dadosAcompanhamentoClienteMaisCompras: any[] = [];



  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['Categoria', 'ValorGasto'];
  sort!: MatSort; // MatSort não precisa ser inicializado como 'any'
  dados: RelatorioCategoria[] = [];

  
  constructor(private relatorioService: RelatoriosService, private acompanhamento: AcompanhamentoClienteService, private datePipe: DatePipe) { 
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

  ngAfterViewInit() {
    this.dataSource.sort = this.sort; // Vincula o MatSort à fonte de dados após a inicialização da visualização
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
      (dados: any) => {
        // **Atribui os dados recebidos à variável 'dados'**
        this.dados = dados;
        this.dataSource.data = dados;
        console.log('Dados recebidos:', dados);
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

listarRelatorio() {
  this.listarDadosComprasRealizadas();
  this.listarDadosMaiorValor();
  this.listarDadosSemCompras();
}

listarDadosMaiorValor() {
  const dataInicioFormatada = this.formatarData(this.dataInicioAcompanhamentoCliente);
  const dataFinalFormatada = this.formatarData(this.dataFinalAcompanhamentoCliente);
  this.acompanhamento.listarMaiorValor(dataInicioFormatada, dataFinalFormatada).subscribe(
    (dados: any[]) => {
      this.dadosAcompanhamentoClienteMaiorValor = dados;
      console.log('Dados recebidos:', dados);
    },
    (erro) => {
      console.log("Erro ao obter os dados:", erro);
    }
  ); 
}

listarDadosSemCompras() {
  const dataInicioFormatada = this.formatarData(this.dataInicioAcompanhamentoCliente);
  const dataFinalFormatada = this.formatarData(this.dataFinalAcompanhamentoCliente);
  this.acompanhamento.listarSemCompras(dataInicioFormatada, dataFinalFormatada).subscribe(
    (dados: any[]) => {
      this.dadosAcompanhamentoClienteSemCompra = dados;
      console.log('Dados recebidos sem compra:', dados);
    },
    (erro) => {
      console.log("Erro ao obter os dados:", erro);
    }
  ); 
}

listarDadosComprasRealizadas() {
  const dataInicioFormatada = this.formatarData(this.dataInicioAcompanhamentoCliente);
  const dataFinalFormatada = this.formatarData(this.dataFinalAcompanhamentoCliente);
  this.acompanhamento.clientesComMaisCompras(dataInicioFormatada, dataFinalFormatada).subscribe(
    (dados: any[]) => {
      this.dadosAcompanhamentoClienteMaisCompras = dados;
      console.log('Dados recebidos:', dados);
    },
    (erro) => {
      console.log("Erro ao obter os dados:", erro);
    }
  ); 
}


}
