import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchInArray"
})
export class SearchInArrayPipe implements PipeTransform {
  constructor() {}
  transform(value: any, array: Array<any>, fieldComparative, fieldSearch): any {
    const objSearch = array.find(item => item[fieldComparative] == value);
    if (objSearch) {
      return objSearch[fieldSearch];
    } else {
      return "";
    }
  }
}
