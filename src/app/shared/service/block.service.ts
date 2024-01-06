import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "../../utils/constants";

@Injectable({
  providedIn: "root"
})
export class BlockService {
  constructor(private http: HttpClient) {}

  getAuthorization() {
    return btoa(localStorage.getItem("jwt"));
  }

  saveBLock(data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + "/block", data, {
      headers: headers
    });
  }

  getFilter(search, page, quantity) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/block/search", {
      headers: headers,
      params: { search: search, page: page, quantity: quantity }
    });
  }

  getOne(id) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/block/detail/" + id, {
      headers: headers
    });
  }

  update(idBlock, data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(Constants.BACKEND_URL + "/block/" + idBlock, data, {
      headers: headers
    });
  }
  delete(idBlock) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.delete(Constants.BACKEND_URL + "/block/" + idBlock, {
      headers: headers
    });
  }
}
