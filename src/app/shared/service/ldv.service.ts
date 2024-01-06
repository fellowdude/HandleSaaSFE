import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "../../utils/constants";

@Injectable({
  providedIn: "root"
})
export class LdvService {
  constructor(private http: HttpClient) { }
  getAuthorization() {
    return btoa(localStorage.getItem("jwt"));
  }

  getAllLDV() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/list-of-values", {
      headers: headers
    });
  }

  getLdvSearch(codeLdv, search: any) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + "/list-of-values/detail/code-condition/" + codeLdv,
      {
        headers: headers,
        params: { search: JSON.stringify(search) },
      },
    );
  }


  getLdvDetail(codeLdv) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + "/list-of-values/detail/" + codeLdv,
      { headers: headers }
    );
  }

  getLdvDetailById(id) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + "/list-of-values/detail/byId/" + id,
      { headers: headers }
    );
  }

  getAllEntity() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + "/list-of-values/entity-list",
      { headers: headers }
    );
  }
}
