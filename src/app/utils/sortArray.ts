export class SortArray {
  static orderArrayAlphabetical(arr: Array<any>, by?: string): Array<any> {
    if (by) {
      arr.sort((a, b) => {
        /* if (a[by] < b[by]) {
          return -1;
        } else {
          return 1;
        } */
        return a[by].localeCompare(b[by])
      });
    } else {
      arr.sort()
    }
    return arr;
  }
};