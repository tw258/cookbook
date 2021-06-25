import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recipePretty'
})
export class RecipePrettyPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
