import { Constants } from "./../../utils/constants";
import { HttpHeaders } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface dataUpdateShoppingCard {
  id_user: string,
  quantity: number,
}

interface dataCreateShoppingCard {
  id_product: string,
  quantity: number,
}
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private http: HttpClient) { }
  getAuthorization() {
    return btoa(localStorage.getItem("jwt"));
  }

  itemCreate(data: Array<dataCreateShoppingCard>) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + "/shopping-cart/call-center", data, {
      headers: headers
    });
  }

  listCallCenter(data: Array<dataCreateShoppingCard>) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + "/shopping-cart/callcenter", data, {
      headers: headers
    });
  }


  updateOne(idProduct, data: dataUpdateShoppingCard) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(Constants.BACKEND_URL + "/shopping-cart/call-center/" + idProduct, data, {
      headers: headers
    });
  }
  findByUser(userId) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/shopping-cart/user/" + userId, {
      headers: headers
    });
  }

  deleteItem(productId, quantity, customerId) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.delete(Constants.BACKEND_URL + "/shopping-cart/call-center/" + productId + '/' + customerId, {
      headers: headers,
      params: { quantity }
    });
  }

  returnAll(data) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(Constants.BACKEND_URL + "/shopping-cart/all-call-center/", data, {
      headers: headers,
    });
  }

  deleteAll(userClient) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.delete(Constants.BACKEND_URL + "/shopping-cart/delete-all-call-center/" + userClient , {
      headers: headers,
    });
  }

}
