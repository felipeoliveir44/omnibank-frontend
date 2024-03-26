import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Cartao } from 'src/app/models/cartao';
import { CartaoResponse } from 'src/app/models/cartao';
import { HttpEvent } from '@angular/common/http';
import { Page } from 'src/app/models/page';

@Injectable({
  providedIn: 'root'
})
export class CartaoserviceService {
  private urlListarCliente: string = 'http://localhost:8080/cliente/listar'
  private urlCadastrarCartao: string = 'http://localhost:8080/cartoes/cadastrar'
  private urlListarCartao: string = 'http://localhost:8080/cartoes/listar';
  private urlListarCartaoCpf: string = 'http://localhost:8080/cartoes/listar/cpf'
  private urlListarCartaoNumero: string = 'http://localhost:8080/cartoes/listar/numero'
  private urlAtualizarStatus: string = 'http://localhost:8080/cartoes/atualizarStatus'
  private urlAtualizarLimite: string = 'http://localhost:8080/cartoes/atualizarLimite'
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

  listarCartao(pagina: number): Observable<Page<Cartao>> {
    return this.http.get<Page<Cartao>>(`${this.urlListarCartao}?page=${pagina}`);
  }

  listarCartaoCpf(cpf: string): Observable<Page<Cartao>> {
    return this.http.get<Page<Cartao>>(`${this.urlListarCartaoCpf}/${cpf}`);
  }

  listarCartaoNumero(numero: string): Observable<Page<Cartao>> {
    return this.http.get<Page<Cartao>>(`${this.urlListarCartaoNumero}/${numero}`);
  }

  atualizarStatusCartao(cartaoId: number, novoStatus: number) {
    const url = `${this.urlAtualizarStatus}`;
    const dados = { id: cartaoId, status: novoStatus };
    return this.http.put(url, dados); // Envie uma requisição PUT com os dados necessários
  }

  atualizarLimiteCartao(cartaoId: number, limite:number): Observable<Cartao> {
    const url = `${this.urlAtualizarLimite}`;
    const dados = {id:cartaoId, limite: limite}
    return this.http.put<Cartao>(url, dados);
  }
  
  

}
