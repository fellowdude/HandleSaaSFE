import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "../../utils/constants";

@Injectable({
  providedIn: "root"
})
export class StaticPageService {
  constructor(private http: HttpClient) {}
  getAuthorization() {
    return btoa(localStorage.getItem("jwt"));
  }

  getIngoPage(idPage) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/static-page/" + idPage, {
      headers: headers
    });
  }

  getFilter(search, page, quantity) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/static-page/search", {
      headers: headers,
      params: { search: search, page: page, quantity: quantity }
    });
  }

  savePage(data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + "/static-page", data, {
      headers: headers
    });
  }

  update(idProduct, data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + "/static-page/" + idProduct,
      data,
      { headers: headers }
    );
  }

  delete(idStaticPage) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.delete(
      Constants.BACKEND_URL + "/static-page/" + idStaticPage,
      { headers: headers }
    );
  }
}
