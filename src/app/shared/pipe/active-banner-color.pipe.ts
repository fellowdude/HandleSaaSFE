import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activeBannerColor'
})
export class ActiveBannerColorPipe implements PipeTransform {

  transform(value: any, contentData: any): any {
    const today = new Date();
    let addContent = false;
    if (!contentData.date_select_start || !contentData.date_select_end) {
      addContent = true;
    } else {
      if (
        new Date(contentData.date_select_start).getTime() <= today.getTime()
      ) {
        addContent = false;
        if (contentData.date_select_end) {
          if (
            today.getTime() <= new Date(contentData.date_select_end).getTime()
          ) {
            addContent = true;
          }
        } else {
          addContent = true;
        }
      }
    }
    let resultValid = ''
    if (addContent) {
      resultValid = 'Activado';
    } else {
      resultValid = 'Desactivado';
    }
    if (value == resultValid) {
      return true
    } else {
      return false
    }
  }

}
