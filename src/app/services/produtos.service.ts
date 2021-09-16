import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor( private httpClient:HttpClient ) { }

  pegarProdutos(){
    return this.httpClient.get('http://localhost:8080/api/produtos');
   }

   pegarProdutoPorId(id:any){
    return this.httpClient.get('http://localhost:8080/api/produto/'+id);
   }



}
