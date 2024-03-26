import { Component } from '@angular/core';
import { ClientesService } from '../servicos/cliente/clientes.service';
import { Cliente } from '../models/cliente';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastrocliente',
  templateUrl: './cadastrocliente.component.html',
  styleUrls: ['./cadastrocliente.component.scss']
})
export class CadastroclienteComponent{

   cliente = new Cliente()
   clients: Cliente[] = [];



  constructor(private service: ClientesService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  // selecionar(){
  //   this.service.selecionar().subscribe(retorno =>{
  //     this.cliente=retorno
  //     console.log(this.cliente)
  //   })
  // }
  submitForm() {
    console.log(this.cliente)
    this.service.cadastrar(this.cliente).subscribe(retorno => {
    this.clients = retorno
    this.exibirSnackBarErro('Cliente cadastrado com sucesso!');
    },
    (erro) => {
      this.exibirSnackBarErro('Erro! Tente novamente');
    }
    );
   }

   private exibirSnackBarErro(mensagem: string): void {
    this._snackBar.open(mensagem, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}