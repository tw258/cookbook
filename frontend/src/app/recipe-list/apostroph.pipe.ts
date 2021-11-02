import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'apostroph',
})
export class ApostrophPipe implements PipeTransform {
  transform(text: string | undefined): string {
    if (!text) {
      return '';
    }

    const suffix = text.endsWith('s') ? "'" : "'s";

    return `${text}${suffix}`;
  }
}
