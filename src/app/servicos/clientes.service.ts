import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private url:string = 'http://localhost:8080/cliente/listar'

  constructor(private http: HttpClient) { }

  selecionar():Observable<any[]>{
    return this.http.get<any[]>(this.url)
  }
}
