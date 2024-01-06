import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "src/app/utils/constants";

@Injectable({
  providedIn: "root"
})
export class GroupApprovalService {
  constructor(private http: HttpClient) {}

  getAuthorization() {
    return btoa(localStorage.getItem("jwt"));
  }

  getById(idExperience) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + "/group-approval/" + idExperience,
      { headers: headers }
    );
  }

  getAll() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + "/group-approval",
      { headers: headers }
    );
  }

  update(idExperience, data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + "/group-approval/" + idExperience,
      data,
      { headers: headers }
    );
  }

  delete(idExperience) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.delete(
      Constants.BACKEND_URL + "/group-approval/" + idExperience,
      { headers: headers }
    );
  }

  save(data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + btoa(localStorage.getItem("jwt")));
    return this.http.post(Constants.BACKEND_URL + "/group-approval", data, {
      headers: headers
    });
  }
}
