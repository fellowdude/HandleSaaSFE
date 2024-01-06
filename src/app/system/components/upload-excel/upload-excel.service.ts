import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "src/app/utils/constants";

@Injectable({
  providedIn: "root",
})
export class UploadExcelService {
  constructor(private http: HttpClient) {}
  getAuthorization() {
    return btoa(localStorage.getItem("jwt"));
  }

  uploadFile(data: FormData, urlService: string, params?: any) {
    const headers = new HttpHeaders().append(
      "Authorization",
      "Bearer " + this.getAuthorization()
    );
    if (params) {
      return this.http.post(Constants.BACKEND_URL + urlService, data, {
        headers: headers,
        params
      });
    } else {
      return this.http.post(Constants.BACKEND_URL + urlService, data, {
        headers: headers,
      });
    }
  }

  apiDownload(urlService, parameter?) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/octet-stream")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + urlService, {
      headers: headers,
      params: parameter,
      responseType: "blob",
    });
  }
}
