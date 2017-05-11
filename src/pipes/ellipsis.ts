import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'ellipsis'})
export class EllipsisPipe implements PipeTransform {
  transform(value: string, chrt: number): string {
    let str = value.substring(0,chrt);
    str = str+" ... ";
    return str;
  }
}