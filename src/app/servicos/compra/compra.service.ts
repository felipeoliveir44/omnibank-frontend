import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private urlListarCliente: string = 'http://localhost:8080/cliente/listar'
  private urlListarCartao: string = 'http://localhost:8080/cartoes/listar';
  private urlCadastrarCompra: string = 'http://localhost:8080/compra/cadastrar';
  private urlListarCategoria: string = 'http://localhost:8080/categoria/listar';
  constructor(private http: HttpClient) { }


  buscarClientesAutocomplete(nome: string): Observable<any[]> {
    const params = new HttpParams().set('nome', nome);
    return this.http.get<any>(this.urlListarCliente, { params }).pipe(
      map(response => response.content)
    );
  }

  buscarCartaoAutoComplete(nome: string): Observable<any[]> {
    const params = new HttpParams().set('nome', nome);
    return this.http.get<any>(this.urlListarCartao, { params }).pipe(
      map(response => response.content)
    );
  }

  buscarCategoriaAutoComplete(): Observable<any[]> {
    return this.http.get<any>(this.urlListarCategoria).pipe(
      map(response => response)
    );
  }
  
  cadastrar(valor:number, categoria:string, estabelecimento:string, cartaoId:number): Observable<any> {
    const corpoRequisicao = { valor: valor, categoria: categoria,  estabelecimento: estabelecimento, idCartao: cartaoId }
    return this.http.post<any>(this.urlCadastrarCompra, corpoRequisicao);
  }

}
