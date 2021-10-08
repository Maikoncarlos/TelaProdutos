import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (arg == '' || arg.length < 2) return value;

    const resultPosts = [];

    for (const post of value) {
      if (
        post.nome.indexOf(arg) > -1 ||
        post.nome.toLowerCase().indexOf(arg.toLowerCase()) > -1
      ) {
        console.log( 'Resultado valor', post.valor);
        resultPosts.push(post);
      }
    }

    return resultPosts;
  }
}
