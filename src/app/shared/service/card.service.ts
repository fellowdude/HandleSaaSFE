import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Constants } from "../../utils/constants";

@Injectable({
  providedIn: "root"
})
export class CardService {
  constructor(private http: HttpClient) {}
  getAuthorization() {
    return btoa(localStorage.getItem("jwt"));
  }

  createCard(data, urlService) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + urlService, data, {
      headers: headers,
    });
  }

  middlewareCreateCard(data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append('Key', 'Bearer ' + btoa(localStorage.getItem('key_enterprise')));
    return this.http.post(Constants.MIDDLEWARE_URL + '/card/add-multi-card', data, {
      headers: headers,
    });
  }
}
