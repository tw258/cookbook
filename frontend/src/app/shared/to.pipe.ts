import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'to',
})
export class ToPipe implements PipeTransform {
  transform(bytes: number, unit?: 'kb' | 'mb' | 'gb'): string {
    let divider = 1;
    let suffix = 'bytes';

    switch (unit) {
      case 'gb':
        divider = 1000000000;
        suffix = 'GB';
        break;
      case 'mb':
        divider = 1000000;
        suffix = 'MB';
        break;
      case 'kb':
        divider = 1000;
        suffix = 'KB';
        break;
      default:
        break;
    }

    return `${(bytes / divider).toFixed(2)} ${suffix}`;
  }
}
