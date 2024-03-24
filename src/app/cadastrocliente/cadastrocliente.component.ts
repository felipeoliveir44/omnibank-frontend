import { Component } from '@angular/core';
import { ClientesService } from '../servicos/cliente/clientes.service';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-cadastrocliente',
  templateUrl: './cadastrocliente.component.html',
  styleUrls: ['./cadastrocliente.component.scss']
})
export class CadastroclienteComponent{

   cliente = new Cliente()
   clients: Cliente[] = [];



  constructor(private service: ClientesService) { }

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
    console.log(this.clients)
    })
   }
}