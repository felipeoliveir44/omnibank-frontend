import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot  } from '@angular/router';
import { CartaoserviceService } from '../servicos/cartao/cartao.service';
import { Cartao } from '../models/cartao';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alterarlimitecartao',
  templateUrl: './alterarlimitecartao.component.html',
  styleUrls: ['./alterarlimitecartao.component.scss']
})
export class AlterarlimitecartaoComponent implements OnInit {
  cartaoSelecionado!: Cartao;
  novoLimite!: number;
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private cartaoService: CartaoserviceService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
     // Recupera o cartão selecionado da sessionStorage
     const cartaoSelecionadoString = sessionStorage.getItem('cartaoSelecionado');
     if (cartaoSelecionadoString) {
       this.cartaoSelecionado = JSON.parse(cartaoSelecionadoString);
       console.log('Cartão selecionado:', this.cartaoSelecionado);
     } else {
       console.log('Cartão selecionado não encontrado na sessionStorage.');
     }
  }

  atualizarLimite(cartaoId: number, limite: number): void {
    this.cartaoService.atualizarLimiteCartao(cartaoId, limite).subscribe(
      (response) => {
        this.exibirSnackBarErro("Limite alterado com sucesso!");
        this.router.navigateByUrl('/listagemcartao');
      },
      (erro) => {
        this.exibirSnackBarErro("Erro! Tente novamente");
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
