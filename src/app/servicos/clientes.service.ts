import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private url:string = 'http://localhost:8080/cliente/listar'
  private post:string = 'http://localhost:8080/cliente/cadastrar'

  constructor(private http: HttpClient) { }

  selecionar():Observable<any[]>{
    return this.http.get<any[]>(this.url)
  }
  
  cadastrar(obj: any):Observable<any[]>{
    return this.http.post<any[]>(this.post, obj)
  }

}
