import { Constants } from "./../../utils/constants";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CampaignService {
  constructor(private http: HttpClient) {}
  getAuthorization() {
    return btoa(localStorage.getItem("jwt"));
  }

  createCampagin(data) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + "/campaign", data, {
      headers
    });
  }

  updateCampaign(data, campaignId) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + "/campaign/" + campaignId,
      data,
      {
        headers
      }
    );
  }

  updateManyCampaigns(data: any[]) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + "/campaign/update-many",
      data,
      { headers: headers }
    );
  } 

  getOne(idCampaign: string) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/campaign/" + idCampaign, {
      headers
    });
  }

  getCampaignNames() {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/campaign/campaignNames", {
      headers
    });
  }

  getTableCategory() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/campaign/table-category", {
      headers: headers
    });
  }

  searchFriendlyURL(friendly_url, name, _id?) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/campaign/friendly_url/" + friendly_url + '/' + name + '/' +_id, {
      headers: headers,
    });
  }

  getCampaignFilters(id) {
    const headers = new HttpHeaders()
    .set("Content-type", "application/json")
    .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/campaign/campaign-filters/" + id, {
      headers: headers,
    });
  }

  // getCampaignsByProducts(products: any[]) {
  //   const headers = new HttpHeaders()
  //     .set("Content-Type", "application/json")
  //     .append("Authorization", "Bearer " + this.getAuthorization());

  //   return this.http.get(Constants.BACKEND_URL + "/campaign/getAllCampaigns", {
  //     headers,
  //     params: {
  //       products: JSON.stringify(
  //         products.map(element => {
  //           return element.productId._id;
  //         })
  //       )
  //     }
  //   });
  // }

  filterCategoryFromCategoryGroup(search, groupId) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/campaign/search/" + groupId, {
      headers: headers,
      params: {
        search: JSON.stringify(search)
      }
    });
  }

  filterCategoryGroupWithCategory(search, groupId) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/campaign/search-group/" + groupId, {
      headers: headers,
      params: {
        search: JSON.stringify(search)
      }
    });
  }

  deleteCampaign(idCampaign: string) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.delete(Constants.BACKEND_URL + "/campaign/" + idCampaign, {
      headers
    });
  }
}

