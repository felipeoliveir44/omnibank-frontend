import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/servicos/cliente/clientes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-editar',
  templateUrl: './dialog-editar.component.html',
  styleUrls: ['./dialog-editar.component.scss'],
})
export class DialogEditarComponent implements OnInit {
  cliente: Cliente;
  clienteCopia: Cliente;

  constructor(
    public dialogRef: MatDialogRef<DialogEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clienteService: ClientesService,
    private snackBar: MatSnackBar
  ) {
    this.cliente = data.cliente;
    this.clienteCopia = { ...this.cliente };
  }
  ngOnInit(): void {
    console.log('Cliente: ', this.cliente);
  }

  cancelar(): void {
    this.dialogRef.close(null);
  }

  editarCliente(idCliente: number, nome: string, email:string, telefone: string ): void {
    this.clienteService.atualizarCliente(idCliente, nome, email, telefone).subscribe(
      (response) => {
        this.exibirSnackBarErro("Cliente alterado com sucesso!");
        window.location.reload();
      },
      (erro) => {
        this.exibirSnackBarErro("Erro! Tente novamente");
      }
    );
  }

   private exibirSnackBarErro(mensagem: string): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
