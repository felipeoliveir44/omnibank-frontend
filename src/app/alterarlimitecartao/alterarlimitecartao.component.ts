import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartaoserviceService } from '../servicos/cartao/cartao.service';
import { Cartao } from '../models/cartao';

@Component({
  selector: 'app-alterarlimitecartao',
  templateUrl: './alterarlimitecartao.component.html',
  styleUrls: ['./alterarlimitecartao.component.scss']
})
export class AlterarlimitecartaoComponent implements OnInit {
  cartaoSelecionado: Cartao | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private cartaoService: CartaoserviceService) { }

  ngOnInit() {
    // Verifica se há dados no estado da rota
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['cartaoSelecionado']) {
      // Obtém os dados do cartão do estado da rota
      this.cartaoSelecionado = state['cartaoSelecionado'];
      console.log('Dados do cartão selecionado:', this.cartaoSelecionado);
    }
  }
}

