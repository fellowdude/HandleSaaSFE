import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "../../utils/constants";

@Injectable({
  providedIn: "root",
})
export class SupplierService {
  constructor(private http: HttpClient) {}

  delete(idSupplier) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.delete(Constants.BACKEND_URL + "/supplier/" + idSupplier, {
      headers: headers,
    });
  }

  getAuthorization() {
    return btoa(localStorage.getItem("jwt"));
  }
  getById(idSupplier) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/supplier/" + idSupplier, {
      headers: headers,
    });
  }

  verifyHaveERPSupplier(supplierId: any) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + "/supplier/verify-have-erp/" + supplierId,
      { headers: headers }
    );
  }

  getMethodSendSupplier(supplierId: any) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/supplier/method-send", {
      headers: headers,
      params: { supplierId },
    });
  }

  getBrand(idSupplier) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + "/supplier/brand/" + idSupplier,
      { headers: headers }
    );
  }
  getAllSupplier(query?: any, project?: any) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/supplier", {
      headers: headers,
      params: {
        query: query ? JSON.stringify(query) : null,
        project: project ? JSON.stringify(project) : null,
      },
    });
  }

  getAllSupplierDelivery() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + "/supplier/supplier-delivery",
      { headers: headers }
    );
  }

  getAllSupplierDeliverySupplier(supplierId) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + "/supplier/supplier-delivery/" + supplierId,
      { headers: headers }
    );
  }

  getFilterSupplier(search, page, quantity) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/supplier/search", {
      headers: headers,
      params: { search: search, page: page, quantity: quantity },
    });
  }
  validIsSupplier() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/supplier/valid-supplier", {
      headers: headers,
    });
  }
  updateSupplier(idSupplier, data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + "/supplier/" + idSupplier,
      data,
      { headers: headers }
    );
  }
  saveSupplier(data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + "/supplier", data, {
      headers: headers,
    });
  }

  getSupplierLocals(supplierId) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/supplier-local/get-locals/" + supplierId, {
      headers: headers
    });
  }

  createNewSupplierLocal(body, supplierId) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + "/supplier-local/create-local/" + supplierId, body, {
      headers: headers
    });
  }

  updateSupplierLocal(body, localId) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(Constants.BACKEND_URL + "/supplier-local/update-local/" + localId, body, {
      headers: headers
    })
  }

  deleteSupplierLocal(localId) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.delete(Constants.BACKEND_URL + "/supplier-local/delete-local/" + localId, {
        headers: headers
      })
  }
}
