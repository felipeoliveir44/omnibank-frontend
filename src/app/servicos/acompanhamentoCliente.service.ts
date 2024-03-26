import { RelatorioCategoria } from './../models/relatorioCategoria';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcompanhamentoClienteService {
private UrlRelatorioMaisCompras:string = 'http://localhost:8080/relatorio/mais-compras'
private UrlRelatorioMaiorValor:string = 'http://localhost:8080/relatorio/maiorValor'
private UrlRelatorioSemCompras:string = 'http://localhost:8080/relatorio/semCompras'


constructor(private http:HttpClient) { }
listarMaiorValor(inicio: Date, fim:Date): Observable<any> {
  const corpoRequisicao = { inicio: inicio, fim: fim }
  return this.http.post<any>(this.UrlRelatorioMaiorValor, corpoRequisicao);
}

listarSemCompras(inicio: Date, fim:Date): Observable<any> {
  const corpoRequisicao = { inicio: inicio, fim: fim }
  return this.http.post<any>(this.UrlRelatorioSemCompras, corpoRequisicao);
}
}

