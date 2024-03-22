import { Component, OnInit } from '@angular/core';
import { CartaoserviceService } from '../cartaoservice.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map, switchMap } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

export interface User {
  nome: string;
}

@Component({
  selector: 'app-cadastrocartao',
  templateUrl: './cadastrocartao.component.html',
  styleUrls: ['./cadastrocartao.component.scss'],
})
export class CadastrocartaoComponent implements OnInit {
  autoCompleteClientes = new FormControl();
  clientesOptions!: Observable<any[]>; // Use "!" para indicar que clientesOptions será inicializado posteriormente

  constructor(private cartaoService: CartaoserviceService) { }

  ngOnInit(): void {
    this.clientesOptions = this.autoCompleteClientes.valueChanges.pipe(
      startWith(''),
      switchMap(value => this.filterOptions(value, 0, 10)) // Troque map por switchMap
    );
  }

  filterOptions(value: string, page: number, size: number): Observable<any[]> { // Modifique o retorno para Observable<any[]>
    // Chame o serviço para obter os dados do banco de dados e filtre-os com base no valor de entrada
    // Aqui está um exemplo básico, substitua-o pelo seu próprio código
    return this.cartaoService.getAutocompleteData(page, size)
      .pipe(
        map(options => options.filter(option => option.nome.toLowerCase().includes(value.toLowerCase())))
      );
  }
}
//   autoCompleteClientes = new FormControl<string | User>('');
//   clientes: User[] = [];
//   clientesOptions!: Observable<User[]>;

//   constructor(private cartaoService : CartaoserviceService) {}
//   ngOnInit() : void{

//     this.cartaoService.getAutocompleteData().subscribe(
//       (data: any[]) => {
//         this.clientes = data; // Atribui os dados obtidos do JSON ao array "dados"
//       },
//       (error) => {
//         console.error('Erro ao obter dados:', error);
//       }
//     );

//     this.clientesOptions = this.autoCompleteClientes.valueChanges.pipe(
//       startWith(''),
//       map(value => {
//         const name = typeof value === 'string' ? value : value?.nome;
//         return name ? this._filter(name as string) : this.clientes.slice();
//       }),
//     );
//   }

//   displayFn(user: User): string {
//     return user && user.nome ? user.nome : '';
//   }

//   private _filter(name: string): User[] {
//     const filterValue = name.toLowerCase();

//     return this.clientes.filter(nome => name.toLowerCase().includes(filterValue));
//   }
// }
