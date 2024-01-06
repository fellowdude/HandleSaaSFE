import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "../../utils/constants";

@Injectable({
  providedIn: "root"
})
export class TableService {
  constructor(private http: HttpClient) { }
  getAuthorization() {
    return btoa(localStorage.getItem("jwt"));
  }

  getFilter(search, page, quantity, urlService, filterProductsByCampaign?) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + urlService, {
      headers: headers,
      params: {
        search: JSON.stringify(search).replace(/\+/g, '%20'),
        page,
        quantity,
        filterProductsByCampaign
      }
    });
  }

  getAllFilter(search, page, quantity, urlService) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + urlService, {
      headers: headers,
      params: { search: JSON.stringify(search), page: page, quantity: quantity }
    });
  }

  delete(idEntity, urlService) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.delete(
      Constants.BACKEND_URL + urlService + "/" + idEntity,
      { headers: headers }
    );
  }

  updateEntity(urlService, idEntity, body) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + urlService + "/" + idEntity, body,
      { headers: headers }
    );
  }


  update(urlService, body) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + urlService, body,
      { headers: headers }
    );
  }
}
