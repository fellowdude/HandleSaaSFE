import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "../../utils/constants";

@Injectable({
  providedIn: "root"
})
export class BrandService {
  constructor(private http: HttpClient) { }

  answerRequest(idBrand, data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + "/brand/answer-request/" + idBrand,
      data,
      { headers: headers }
    );
  }

  delete(idProduct) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.delete(Constants.BACKEND_URL + "/brand/" + idProduct, {
      headers: headers
    });
  }

  getAuthorization() {
    return btoa(localStorage.getItem("jwt"));
  }
  getAllBrand(params) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/brand", {
      params,
      headers: headers
    });
  }
  getAllBrandBasic(params?) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/brand/basic", {
      params,
      headers: headers
    });
  }

  getAllBrandsNames() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/brand/brandName", {
      headers: headers
    });
  }

  getById(idBrand) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/brand/" + idBrand, {
      headers: headers
    });
  }

  getFilterBrand(search, page, quantity) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/brand/search", {
      headers: headers,
      params: { search: search, page: page, quantity: quantity }
    });
  }

  updateBrand(idBrand, data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(Constants.BACKEND_URL + "/brand/" + idBrand, data, {
      headers: headers
    });
  }

  saveBrand(data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + "/brand", data, {
      headers: headers
    });
  }

  searchFriendlyURL(friendly_url, _id?) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/brand/friendly_url/" + friendly_url + '/' + _id, {
      headers: headers,
    });
  }
}
