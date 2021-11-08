import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'germanDate',
})
export class GermanDatePipe implements PipeTransform {
  transform(dateAsISO: string, includeTime = false): string {
    const date = new Date(dateAsISO);

    return this.parseDate(date, includeTime);
  }

  parseDate(d: Date, addTime: boolean = true): string {
    return this.addPadding(
      `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}` +
        (addTime ? ` ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}` : ''),
      addTime,
    );
  }

  addPadding(s: string, addTime: boolean = true): string {
    if (s[2] != '.') {
      s = this.insertAt(s, '0', 0);
    }
    if (s[5] != '.') {
      s = this.insertAt(s, '0', 3);
    }

    if (addTime) {
      if (s[13] != ':') {
        s = this.insertAt(s, '0', 11);
      }
      if (s[16] != ':') {
        s = this.insertAt(s, '0', 14);
      }
      if (s.length < 19) {
        s = this.insertAt(s, '0', 17);
      }
    }

    return s;
  }

  insertAt(s: string, stringToInsert: string, index: number): string {
    return s.substr(0, index) + stringToInsert + s.substr(index);
  }
}
