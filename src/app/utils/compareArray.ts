export class CompareArray {
  static compare(
    originalArray: Array<any>,
    newArray: Array<any>,
    compareField?: Array<string>
  ): boolean {
    let existChange: boolean = false;
    if (originalArray.length === newArray.length) {
      for (let i = 0; i < originalArray.length; i++) {
        if (
          typeof originalArray[i] == "object" &&
          originalArray[i].length == undefined &&
          typeof newArray[i] == "object" &&
          newArray[i].length == undefined
        ) {
          for (const field of compareField) {
            if (originalArray[i][field] != newArray[i][field]) {
              existChange = true;
              break;
            }
          }
        } else {
          let valueOriginal = "";
          if (Array.isArray(originalArray[i])) {
            valueOriginal = originalArray[i][0];
          } else {
            valueOriginal = originalArray[i];
          }
          let valueNew = "";
          if (Array.isArray(newArray[i])) {
            valueNew = newArray[i][0];
          } else {
            valueNew = newArray[i];
          }
          if (valueOriginal != valueNew) {
            existChange = true;
            break;
          }
        }
      }
    } else {
      existChange = true;
    }

    return existChange;
  }
}
