import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisualizarfaturaService {

  private urlFatura:string = 'http://localhost:8080/cartoes/visualizarFatura'
  constructor(private http: HttpClient) { }

  listar(numeroCartao: string, dataInicial:string, dataFinal:string): Observable<any> {
    const corpoRequisicao = { numeroCartao: numeroCartao, dataInicial: dataInicial, dataFinal: dataFinal }
    return this.http.post<any>(this.urlFatura, corpoRequisicao);
  }
}
