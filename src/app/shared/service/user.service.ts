import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "../../utils/constants";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) { }
  getAuthorization() {
    return btoa(localStorage.getItem("jwt"));
  }
  getBasicInfo() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/user/basic-info", {
      headers: headers
    });
  }

  getDetailUser(idUser) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/user/" + idUser, {
      headers: headers
    });
  }

  validAdmin() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/user/valid-admin", {
      headers: headers
    });
  }

  saveUser(body) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + "/user/user-admin", body, {
      headers: headers
    });
  }

  saveCustomer(body) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + "/user/client-admin", body, {
      headers: headers
    });
  }

  createNewAddressCustomer(body, customerId) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + "/user-address/create-address/" + customerId, body, {
      headers: headers
    });
  }

  updateAddressCustomer(body, addressId) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(Constants.BACKEND_URL + "/user-address/update-address/" + addressId, body, {
      headers: headers
    })
  }

  updateProfileUser(body) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(Constants.BACKEND_URL + "/user/update-profile", body, {
      headers: headers
    });
  }

  updateUser(body, idUser) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + "/user/admin/" + idUser,
      body,
      {
        headers: headers
      }
    );
  }

  updateCustomer(body, idUser) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + "/user/customer/" + idUser,
      body,
      {
        headers: headers
      }
    );
  }

  getLastCustomer() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/octet-stream")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/user/last-customer", {
      headers: headers
    });
  }

  getAddressCustomer(customerId) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/octet-stream")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/user/customer-address/" + customerId, {
      headers: headers
    });
  }
  getAvailableAddress(customerId) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/octet-stream")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/user/available-type-address/" + customerId, {
      headers: headers
    });
  }

  deleteAddressCustomer(body, addressId) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.delete(Constants.BACKEND_URL + "/user-address/delete-address/" + addressId, {
        headers: headers
      })
  }

  getByDocument(typeDocument, numberDocument) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/octet-stream")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/user/customer-info-document/" + typeDocument + "/" + numberDocument, {
      headers: headers
    });
  }

  getByCode(code) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/octet-stream")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/user/customer-info-code-user/" + code, {
      headers: headers
    });
  }

  getByName(name) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/octet-stream")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/user/customer-info-name/" + name, {
      headers: headers
    });
  }



  getOnlyAdmin() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/category-filter", {
      headers: headers
    });
  }

  blockUser(idUser) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + "/user/block/" + idUser,
      { active: false },
      { headers: headers }
    );
  }

  deleteUser(idUser) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.delete(Constants.BACKEND_URL + "/user/" + idUser, {
      headers: headers
    });
  }

  deleteCustomer(idUser) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.delete(Constants.BACKEND_URL + "/user/customer/" + idUser, {
      headers: headers
    });
  }
  unlockUser(idUser) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + "/user/unlock/" + idUser,
      {},
      { headers: headers }
    );
  }

  changePassword(body) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.post(
      Constants.BACKEND_URL + "/authentication/change-password-admin",
      body,
      { headers: headers }
    );
  }

  enterpriseLogo() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/enterprise/logo", {
      headers: headers
    });
  }
}
