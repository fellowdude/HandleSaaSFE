import { Constants } from "./../../utils/constants";
import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RulesAdminService {
  constructor(private http: HttpClient) {}
  getAuthorization() {
    return btoa(localStorage.getItem("jwt"));
  }

  createRulesAdmin(data) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + "/rules-admin", data, {
      headers: headers
    });
  }

  getOne(idRulesAdmin) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + "/rules-admin/" + idRulesAdmin,
      {
        headers: headers
      }
    );
  }

  updateRulesAdmin(data, idRulesAdmin) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + "/rules-admin/" + idRulesAdmin,
      data,
      { headers: headers }
    );
  }
}
