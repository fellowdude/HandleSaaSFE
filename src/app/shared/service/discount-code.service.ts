import { Constants } from "./../../utils/constants";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DiscountCodeService {
  constructor(private http: HttpClient) {}
  getAuthorization() {
    return btoa(localStorage.getItem("jwt"));
  }

  createDiscountCode(data) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + "/discount-code", data, {
      headers
    });
  }

  updateDiscountCode(data, campaignId) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + "/discount-code/" + campaignId,
      data,
      {
        headers
      }
    );
  }

  getOne(idCampaign: string) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/discount-code/" + idCampaign, {
      headers
    });
  }

  deleteDiscountCode(idCampaign: string) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.delete(Constants.BACKEND_URL + "/discount-code/" + idCampaign, {
      headers
    });
  }
}
