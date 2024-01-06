import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activeBanner'
})
export class ActiveBannerPipe implements PipeTransform {

  transform(value: any, contentData: any): any {
    const today = new Date();
    let addContent = false;
    if(!contentData.date_select_start || !contentData.date_select_end){
      addContent = true;
    }else{
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
    if(addContent){
      return 'Activado';
    }else{
      return 'Desactivado';
    }
  }

}
