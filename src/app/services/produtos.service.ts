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

   createProduto(data:any){
    return this.httpClient.post('http://localhost:8080/api/produto',data);
   }

   deleteProduto(id:any){
     return this.httpClient.post('http://localhost:8080/api/produto-delete/'+id, '');
   }

   editarProuto(data:any){
    return this.httpClient.put('http://localhost:8080/api/produto',data);
   }

}
