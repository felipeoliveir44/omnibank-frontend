import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartaoserviceService {
  private urlListarCliente: string = 'http://localhost:8080/cliente/listar'
  private urlCadastrarCartao: string = 'http://localhost:8080/cartoes/cadastrar'
  constructor(private http: HttpClient) {}

  buscarClientesAutocomplete(nome: string): Observable<any[]> {
    const params = new HttpParams().set('nome', nome);
    return this.http.get<any>(this.urlListarCliente, { params }).pipe(
      map(response => response.content)
    );
  }

  cadastrar(id: any, limite:any): Observable<any> {
    const corpoRequisicao = { id: id, limite: limite }
    return this.http.post<any>(this.urlCadastrarCartao, corpoRequisicao);
  }

}