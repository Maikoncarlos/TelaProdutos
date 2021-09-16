import { Component, OnInit } from '@angular/core';
import { ProdutosService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-produtos-page',
  templateUrl: './produtos-page.component.html',
  styleUrls: ['./produtos-page.component.css'],
})
export class ProdutosPageComponent implements OnInit {
  listaDeProdutos: any;

  constructor(private produtosService: ProdutosService) {}

  ngOnInit(): void {
    this.pegarProdutos();
  }

  pegarProdutos() {
    this.produtosService.pegarProdutos().subscribe((resultado) => {
      this.listaDeProdutos = resultado;
    });
  }

  pegarProdutoPorId(id: any) {
    this.produtosService.pegarProdutoPorId(id).subscribe((resultado) => {
      console.log('resultado da API :', resultado);
    });
  }
}
