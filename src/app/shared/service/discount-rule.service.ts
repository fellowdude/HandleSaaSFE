import { Constants } from "./../../utils/constants";
import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DiscountRuleService {
  constructor(private http: HttpClient) {}
  getAuthorization() {
    return btoa(localStorage.getItem("jwt"));
  }

  createDiscountRuleService(data) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + "/rdd", data, {
      headers: headers
    });
  }

  createManyDiscountRules(data) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + "/rdd/many", data, {
      headers: headers
    });
  }

  getAll(val?, ids?) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/rdd/all", {
      headers: headers,
      params: { query: val, ids }
    });
  }

  getAllNames() {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/rdd/allNames", {
      headers
    });
  }

  getOne(idDiscountRule) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/rdd/" + idDiscountRule, {
      headers: headers
    });
  }

  updateDiscountRule(data, idDiscountRule) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + "/rdd/" + idDiscountRule,
      data,
      { headers: headers }
    );
  }

  updateManyDiscountRules(data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(Constants.BACKEND_URL + "/rdd/many", data, {
      headers: headers
    });
  }

  delete(idDiscountRule) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.delete(Constants.BACKEND_URL + "/rdd/" + idDiscountRule, {
      headers: headers
    });
  }
}
