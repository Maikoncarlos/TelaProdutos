import { Component, OnInit } from '@angular/core';
import { ProdutosService } from 'src/app/services/produtos.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertComponent } from '../alert/alert.component';


@Component({
  selector: 'app-produtos-page',
  templateUrl: './produtos-page.component.html',
  styleUrls: ['./produtos-page.component.css'],
})
export class ProdutosPageComponent implements OnInit {
  listaDeProdutos: any;

  closeModal: any;

  createProduto = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    quantidade: new FormControl('', [Validators.required]),
    valor: new FormControl('', [Validators.required]),
  });

  infoDeleteProduto: any;

  constructor(
    private produtosService: ProdutosService,
    private modalService: NgbModal,
    private alertComponent: AlertComponent
  ) {}

  ngOnInit(): void {
    this.pegarProdutos();
  }

  pegarProdutos() {
    this.produtosService.pegarProdutos().subscribe((resultado) => {
      this.listaDeProdutos = resultado;
    });
  }

  pegarProdutoPorId(id: any) {
    this.produtosService.pegarProdutoPorId(id).subscribe((resultado) => {});
  }

  postCreateProduto() {
    this.produtosService
      .postCreateProduto(this.createProduto.value)
      .subscribe((resultado) => {
        this.pegarProdutos();
        this.modalService.dismissAll();

        this.alertComponent.alertTimer('success', 'O produto '+this.createProduto.value.nome+' foi criado com sucesso!' );

        this.createProduto = new FormGroup({
          nome: new FormControl('', [Validators.required]),
          quantidade: new FormControl('', [Validators.required]),
          valor: new FormControl('', [Validators.required]),
        });



      });
  }

  deleteProduto(item: any, modalDeletarProduto: any) {
    this.infoDeleteProduto = item;
    console.log('Dados do produto: ', this.infoDeleteProduto);
    this.triggerModal(modalDeletarProduto);

  }

  deleteconfirmado(){
      this.produtosService.deleteProduto(this.infoDeleteProduto).subscribe((resultado) => {
        this.pegarProdutos();
        this.modalService.dismissAll();
        this.alertComponent.alertTimer('success', 'O produto '+this.infoDeleteProduto.nome+' foi deletado com sucesso!' );
      })
  }








  triggerModal(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;
        },
        (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
