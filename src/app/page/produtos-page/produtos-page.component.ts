import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ProdutosService } from 'src/app/services/produtos.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertComponent } from  '../../components/alert/alert.component';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-produtos-page',
  templateUrl: './produtos-page.component.html',
  styleUrls: ['./produtos-page.component.css'],
})
export class ProdutosPageComponent implements OnInit {
  listaDeProdutos: any;
  filterPost='';
  listaProduto: any;

  closeModal: any;

  createProduto = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    quantidade: new FormControl('', [Validators.required]),
    valor: new FormControl('', [Validators.required]),
  });

  infoProduto: any;

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
      console.log("chegou aqui"+resultado)
      this.listaDeProdutos = resultado;
    });
  }

  pegarProdutoPorId(id: any) {
    this.produtosService.pegarProdutoPorId(id).subscribe((resultado) => {
      this.listaProduto = resultado;
    });
  }

  postCreateProduto() {
    this.produtosService
      .createProduto(this.createProduto.value)
      .subscribe((resultado) => {
        this.pegarProdutos();
        this.modalService.dismissAll();

        this.alertComponent.alertTimer(
          'success',
          'O produto ' +
            this.createProduto.value.nome +
            ' foi criado com sucesso!'
        );

        this.createProduto = new FormGroup({
          nome: new FormControl('', [Validators.required]),
          quantidade: new FormControl('', [Validators.required]),
          valor: new FormControl('', [Validators.required]),
        });
      });
  }

  deleteProduto(id: any, modalDeletarProduto: any) {
    this.infoProduto = id;
    this.triggerModal(modalDeletarProduto);
  }

  deleteConfirmado() {
    this.produtosService
      .deleteProduto(this.infoProduto.id)
      .subscribe((resultado) => {
        this.pegarProdutos();
        this.modalService.dismissAll();
        this.alertComponent.alertTimer(
          'success',
          'O produto ' + this.infoProduto.nome + ' foi deletado com sucesso!'
        );
      });
  }

  editarProduto(item: any, modalEditarProduto: any) {
    this.infoProduto = item;
    console.log('Editar Dados :', this.infoProduto);
    this.triggerModal(modalEditarProduto);
  }

  editarConfirmado(nome: any, quantidade: any, valor: any) {
    const obj = {
      id: this.infoProduto.id,
      nome: nome,
      quantidade: quantidade,
      valor: valor,
    };
    this.produtosService.editarProuto(obj).subscribe((resultado) => {
      this.pegarProdutos();
      this.modalService.dismissAll();
      this.alertComponent.alertTimer(
        'success',
        'O produto ' + nome + ' foi atualizado com sucesso!'
      );
    });
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
