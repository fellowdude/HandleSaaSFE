import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "../../utils/constants";

@Injectable({
  providedIn: "root"
})
export class UbigeoService {
  constructor(private http: HttpClient) {}
  getAuthorization() {
    return btoa(localStorage.getItem("jwt"));
  }

  getAllDepartments() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Key", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/department", { headers });
  }
  getProvincesByDepartment(idDepartment) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Key", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/province/" + idDepartment, {
      headers
    });
  }

  getDistrictsByProvince(idProvince) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Key", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/district/" + idProvince, {
      headers
    });
  }
}
