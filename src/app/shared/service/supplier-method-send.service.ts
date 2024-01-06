import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "../../utils/constants";

@Injectable({
  providedIn: "root",
})
export class SupplierMethodSendService {
  constructor(private http: HttpClient) {}

  delete(idMethod) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.delete(
      Constants.BACKEND_URL + "/method-send/" + idMethod,
      { headers: headers }
    );
  }

  getAuthorization() {
    return btoa(localStorage.getItem("jwt"));
  }
  getById(idMethod) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/method-send/" + idMethod, {
      headers: headers,
    });
  }
  saveMethod(data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + "/method-send", data, {
      headers: headers,
    });
  }

  updateMethod(idMethod, data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + "/method-send/" + idMethod,
      data,
      { headers: headers }
    );
  }

  verifyText(idSupplier) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + "/method-send/type-method-text/" + idSupplier,
      { headers: headers }
    );
  }

  searchBySupplier(idSupplier) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + "/method-send/supplier/" + idSupplier,
      { headers: headers }
    );
  }

  searchAllBySupplier(idSupplier) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + "/method-send/supplier-method/" + idSupplier,
      { headers: headers }
    );
  }
}
