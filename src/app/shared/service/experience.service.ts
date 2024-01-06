import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "../../utils/constants";

@Injectable({
  providedIn: "root"
})
export class ExperienceService {
  constructor(private http: HttpClient) {}

  getAuthorization() {
    return btoa(localStorage.getItem("jwt"));
  }

  create(data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + "/experience", data, {
      headers: headers
    });
  }

  getAllExperience() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/experience/all", {
      headers: headers
    });
  }

  getAllExperienceList() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/experience/all-list", {
      headers: headers
    });
  }

  getFilterExperience(search, page, quantity) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/experience/search", {
      headers: headers,
      params: { search: JSON.stringify(search), page: page, quantity: quantity }
    });
  }

  getChildrenCategories(experienceId: string) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + `/experience/all-categories/${experienceId}`, {
      headers: headers
    });
  }

  getById(idExperience) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + "/experience/" + idExperience,
      { headers: headers }
    );
  }

  update(idExperience, data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + "/experience/" + idExperience,
      data,
      { headers: headers }
    );
  }

  searchSKU(sku) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/experience/sku/" + sku, {
      headers: headers
    });
  }

  searchFriendlyURL(friendly_url, _id?) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/experience/friendly_url/" + friendly_url + '/' + _id, {
      headers: headers,
    });
  }

  delete(idExperience) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.delete(
      Constants.BACKEND_URL + "/experience/" + idExperience,
      { headers: headers }
    );
  }

  deleteCategoryProduct(idExperience, idCategory) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.delete(
      Constants.BACKEND_URL +
        "/experience/category/" +
        idExperience +
        "/" +
        idCategory,
      { headers: headers }
    );
  }
}
