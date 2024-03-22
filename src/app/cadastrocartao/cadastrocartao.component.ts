import { Component, OnInit, ViewChild  } from '@angular/core';
import { CartaoserviceService } from '../cartaoservice.service';
import { cartao } from '../models/cartao';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map, switchMap } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { Cliente } from '../models/cliente';

export interface User {
  nome: string;
}

@Component({
  selector: 'app-cadastrocartao',
  templateUrl: './cadastrocartao.component.html',
  styleUrls: ['./cadastrocartao.component.scss'],
})
export class CadastrocartaoComponent implements OnInit {


  /* Auto complete */
  autoCompleteClientes = new FormControl();
  limiteControl = new FormControl();
  clientesOptions!: Observable<any[]>; // Use "!" para indicar que clientesOptions será inicializado posteriormente
  // clientes: Cliente[] = [];

  
  cartao: cartao[] = [];
  selectedUser: Cliente = new Cliente();  
  valorCampoLimite = 0;
  value = 0;
  
  constructor(private cartaoService: CartaoserviceService) { }

  ngOnInit(): void {
    this.clientesOptions = this.autoCompleteClientes.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.filterOptions(value, this.value, 10)) // Troque map por switchMap
    );
  }

  condicaoPagina() {
    for(let i = 0; i < 10)
  }
  filterOptions(value: string, page: number, size: number): Observable<any[]> { 
    // Modifique o retorno para Observable<any[]>
    // Chame o serviço para obter os dados do banco de dados e filtre-os com base no valor de entrada
    // Aqui está um exemplo básico, substitua-o pelo seu próprio código
    return this.cartaoService.getAutocompleteData(page, size)
      .pipe(
        map(options => options.filter(option => option.nome))
      );
  }


  displayFn(user: Cliente): string {
    return user && user.nome ? user.nome : '';
  }

  @ViewChild('limiteInput') limiteInput: any;
  onSelectionChange(event: any): void {
    this.selectedUser = event.option.value;
    this.valorCampoLimite = this.limiteInput.nativeElement.value;
    console.log('ID do cliente selecionado:', this.selectedUser.id, this.valorCampoLimite);
    // Faça o que for necessário com o ID do cliente selecionado
  }


  submitForm() {
    console.log(this.cartao)
    this.cartaoService.cadastrar(this.selectedUser, this.valorCampoLimite).subscribe(dados => {
    this.cartao = dados
    console.log(this.valorCampoLimite)
    })
   }
}
