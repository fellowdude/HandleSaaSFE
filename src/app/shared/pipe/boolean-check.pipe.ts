import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanCheck'
})
export class BooleanCheckPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value == 'true';
  }

}
