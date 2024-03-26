import { RelatorioCategoria } from './../models/relatorioCategoria';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcompanhamentoClienteService {
private UrlRelatorioMaisCompras:string = 'http://localhost:8080/relatorio/mais-compras'
private UrlRelatorioMaiorValor:string = 'http://localhost:8080/relatorio/maiorValor'
private UrlRelatorioSemCompras:string = 'http://localhost:8080/relatorio/semCompras'


constructor(private http:HttpClient) { }

  listarMaiorValor(inicio: string, fim:string): Observable<any> {
    const corpoRequisicao = { inicio: inicio, fim: fim }
    return this.http.post<any>(this.UrlRelatorioMaiorValor, corpoRequisicao);
  }

  listarSemCompras(inicio: string, fim:string): Observable<any> {
    const corpoRequisicao = { inicio: inicio, fim: fim }
    return this.http.post<any>(this.UrlRelatorioSemCompras, corpoRequisicao);
  }

  listar(inicio: Date, fim:Date): Observable<any> {
    const corpoRequisicao = { inicio: inicio, fim: fim }
    return this.http.post<any>(this.UrlRelatorioSemCompras, corpoRequisicao);
  }

  clientesComMaisCompras(inicio: Date, fim: Date): Observable<any[]> {
    const params = new HttpParams()
      .set('inicio', inicio.toISOString()) // Use toISOString() para formatar a data corretamente
      .set('fim', fim.toISOString());
  
    return this.http.get<any[]>(`${this.UrlRelatorioMaisCompras}`, { params }) // Passe o `HttpParams` como uma opção
      .pipe(
        map(data => data)
      );
  }
}

