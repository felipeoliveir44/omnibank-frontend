import { Component } from '@angular/core';
import { ClientesService } from '../servicos/clientes.service';

@Component({
  selector: 'app-cadastrocliente',
  templateUrl: './cadastrocliente.component.html',
  styleUrls: ['./cadastrocliente.component.scss']
})
export class CadastroclienteComponent{

  private client: any[] = [];

  submitForm() { }

  constructor(private service: ClientesService) { }

  ngOnInit() {
  }

  selecionar(){
    this.service.selecionar().subscribe(retorno =>{
      this.client=retorno
      console.log(this.client)
    })
  }

}
