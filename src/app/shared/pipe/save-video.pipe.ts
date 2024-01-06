import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: "saveVideo"
})
export class SaveVideoPipe implements PipeTransform {
  constructor(public _sanitizer: DomSanitizer) {}
  transform(url: any): any {
    let video;
    let results;
    if (url === null) {
      return "";
    }
    results = url.match("[\\?&]v=([^&#]*)");
    video = results === null ? url : results[1];
    return this._sanitizer.bypassSecurityTrustResourceUrl(
      "https://www.youtube.com/embed/" + video
    );
  }
}
