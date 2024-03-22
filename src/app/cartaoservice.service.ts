import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartaoserviceService {
  private url:string = 'http://localhost:8080/cliente/listar'

  constructor(private http: HttpClient) { }

  getAutocompleteData(page: number, size: number): Observable<any[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any[]>(this.url, { params }).pipe(
      map((response: any) => response.content) // Correção no uso do operador 'map'
    );
  }

}
