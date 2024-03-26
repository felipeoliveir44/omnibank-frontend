import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cartao } from '../models/cartao';
import { CartaoserviceService } from '../servicos/cartao/cartao.service';
import { VisualizarfaturaService } from '../servicos/fatura/visualizarfatura.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-visualizar-fatura',
  templateUrl: './visualizar-fatura.component.html',
  styleUrls: ['./visualizar-fatura.component.scss']
})
export class VisualizarFaturaComponent {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['dataCompra', 'estabelecimento', 'categoria', 'valorCompra'];

  cartaoSelecionado!: Cartao;
  numeroCartao!: string;
  dataInicio!: Date;
  dataFinal!: Date;
  sort!: MatSort; // MatSort não precisa ser inicializado como 'any'
  dados: any[] = []; // Inicialize a variável 'dados' como um array vazio
  

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private faturaService: VisualizarfaturaService) { }

  ngOnInit() {
    // Recupera o cartão selecionado da sessionStorage
    const cartaoSelecionadoString = sessionStorage.getItem('cartaoSelecionado');
    if (cartaoSelecionadoString) {
      this.cartaoSelecionado = JSON.parse(cartaoSelecionadoString);
      this.numeroCartao = this.cartaoSelecionado.numeroCartao;
      console.log('Cartão selecionado:', this.cartaoSelecionado);
    } else {
      console.log('Cartão selecionado não encontrado na sessionStorage.');
    }

    this.listarDados();
  }

  

  ngAfterViewInit() {
    this.dataSource.sort = this.sort; // Vincula o MatSort à fonte de dados após a inicialização da visualização
  }

  listarDados() {
    const dataInicioFormatada = this.formatarData(this.dataInicio);
    const dataFinalFormatada = this.formatarData(this.dataFinal);
  
    console.log(dataInicioFormatada, dataFinalFormatada, this.numeroCartao);
  
    this.faturaService.listar(this.numeroCartao, dataInicioFormatada, dataFinalFormatada).subscribe(
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
}
