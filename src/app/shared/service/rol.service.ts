import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "../../utils/constants";

@Injectable({
  providedIn: "root"
})
export class RolService {
  constructor(private http: HttpClient) { }
  getAuthorization() {
    return btoa(localStorage.getItem("jwt"));
  }

  validAccessRoleWindow(urlSearch, codeSearch) {
    const searchParms = { code: codeSearch, url: urlSearch }
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/role/valid-access", {
      headers: headers,
      params: { params: btoa(JSON.stringify(searchParms)) }
    });
  }
  
  deleteOne(idRole) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.delete(Constants.BACKEND_URL + "/role/" + idRole, {
      headers: headers
    });
  }

  getListRole() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/role/list-role", {
      headers: headers
    });
  }

  getOne(idRole) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/role/" + idRole, {
      headers: headers
    });
  }

  getRole() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/role", {
      headers: headers
    });
  }

  saveRole(body) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + "/role", body, {
      headers: headers
    });
  }

  updateRole(idRole, body) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(Constants.BACKEND_URL + "/role/" + idRole, body, {
      headers: headers
    });
  }
}
