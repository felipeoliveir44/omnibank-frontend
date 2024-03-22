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
  private url:string = 'http://localhost:8080/cliente/listar'
  private post:string = 'http://localhost:8080/cartoes/cadastrar'

  constructor(private http: HttpClient) { }

  getAutocompleteData(page: number, size: number): Observable<any[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any[]>(this.url, { params }).pipe(
      map((response: any) => response.content) // Correção no uso do operador 'map'
    );
  }

  cadastrar(id: any, limite: any): Observable<any[]> {
    return this.http.post<any[]>(this.post, {id, limite });
  }



}
