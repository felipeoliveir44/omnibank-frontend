import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  private urlRelatorioFatura:string = 'http://localhost:8080/relatorio/gastosCategoria'
  private urlListarCartao: string = 'http://localhost:8080/cartoes/listar';
  constructor(private http: HttpClient) { }

  buscarCartaoAutoComplete(nome: string): Observable<any[]> {
    const params = new HttpParams().set('nome', nome);
    return this.http.get<any>(this.urlListarCartao, { params }).pipe(
      map(response => response.content)
    );
  }
  
  listar(idCartao: number, dataInicial:string, dataFinal:string): Observable<any> {
    const corpoRequisicao = { idCartao: idCartao, dataInicial: dataInicial, dataFinal: dataFinal }
    return this.http.post<any>(this.urlRelatorioFatura, corpoRequisicao);
  }
}
