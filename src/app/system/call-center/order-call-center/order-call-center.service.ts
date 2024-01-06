import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Constants } from "src/app/utils/constants";


@Injectable({
  providedIn: 'root'
})
export class OrderCallCenterService {

  constructor(private http: HttpClient) { }
  getAuthorization() {
    return btoa(localStorage.getItem("jwt"));
  }

  createOrder(data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + '/order/call-center', data, {
      headers: headers,
    });
  }
}
