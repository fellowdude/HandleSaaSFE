import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Pipe({
  name: 'fieldValue'
})
export class FieldValuePipe implements PipeTransform {
  transform(value: any, args: any, urlAttachment?: string): any {
    const arrayArgs = args.field.split('.');
    let valueReturn = value;
    for (const field of arrayArgs) {
      if (valueReturn && valueReturn != '') {
        valueReturn = valueReturn[field];
      } else {
        valueReturn = ''
      }
    }
    switch (args.type) {
      case 'currency': {
        const arrayCurrency = args.currency.split('.');
        let currencyValue = value;
        for (const field of arrayCurrency) {
          currencyValue = currencyValue[field];
        }
        if (!currencyValue) {
          currencyValue = 'S/ '
        }

        const moneyPipe = new CurrencyPipe('en-US');
        valueReturn = moneyPipe.transform(valueReturn, currencyValue);
        break;
      }
      case 'date': {
        const datePipe = new DatePipe('en-US');
        valueReturn = datePipe.transform(valueReturn, 'dd-MM-yyyy', '-0500');
        break;
      }
      case 'image': {

        if (!valueReturn || valueReturn == '') {
          valueReturn = './assets/img/blank_image.png'
        } else {
          valueReturn = urlAttachment + valueReturn
        }
      }
    }
    if (args.replace) {
      const indexReplace = args.replace.findIndex(
        item => item.value == valueReturn
      );
      if (indexReplace >= 0) {
        valueReturn = args.replace[indexReplace].replace;
      }
    }
    return valueReturn;
  }
}
