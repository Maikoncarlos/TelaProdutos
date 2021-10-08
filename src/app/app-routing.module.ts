import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosPageComponent } from './page/produtos-page/produtos-page.component';

const routes: Routes = [
  {path: '', component: ProdutosPageComponent},
  {path: 'produtos', component: ProdutosPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
