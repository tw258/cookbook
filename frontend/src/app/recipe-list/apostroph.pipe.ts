import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'apostroph',
})
export class ApostrophPipe implements PipeTransform {
  /**
   * tobi -> Tobi's,
   * andreas -> Andreas'
   */
  transform(text: string | undefined): string {
    if (!text) {
      return '';
    }

    const suffix = text.endsWith('s') ? "'" : "'s";

    return `${text[0].toUpperCase()}${text.slice(1)}${suffix}`;
  }
}
