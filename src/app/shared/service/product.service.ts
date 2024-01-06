import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "../../utils/constants";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private http: HttpClient) { }
  getAuthorization() {
    return btoa(localStorage.getItem("jwt"));
  }
  getAllProduct() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/product/all", {
      headers: headers,
    });
  }

  getAllListProduct() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/product/all-list", {
      headers: headers,
    });
  }

  getFilterProduct(search, page, quantity) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/product/searchAll", {
      headers: headers,
      params: { search: search, page: page, quantity: quantity },
    });
  }

  searchArray(listArray) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/product/searchArray", {
      headers: headers,
      params: { listArray: JSON.stringify(listArray) },
    });
  }

  getById(idProduct) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/product/" + idProduct, {
      headers: headers,
    });
  }
  maxMethodAvailable() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + "/product/max-method-available",
      {
        headers: headers,
      }
    );
  }
  update(idProduct, data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + "/product/" + idProduct,
      data,
      { headers: headers }
    );
  }

  updateManyCampaign(data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(Constants.BACKEND_URL + "/product/many", data, {
      headers,
    });
  }

  answerRequest(idProduct, data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + "/product/answer-request/" + idProduct,
      data,
      { headers: headers }
    );
  }

  answerModifyRequest(idProduct, data, dataToModify) {
    const d = {
      data,
      request_change: dataToModify
    }
    console.log("d", d)
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + "/product/answer-modify-request/" + idProduct,
      d,
      { headers: headers }
    );
  }

  saveProduct(data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + "/product", data, {
      headers: headers,
    });
  }

  searchSKU(sku) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/product/sku/" + sku, {
      headers: headers,
    });
  }

  searchFatherSKU(sku) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/product/product-father/" + sku, {
      headers: headers,
    });
  }

  searchFriendlyURL(friendly_url, _id?) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/product/friendly_url/" + friendly_url + '/' + _id, {
      headers: headers,
    });
  }

  delete(idProduct) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.delete(Constants.BACKEND_URL + "/product/" + idProduct, {
      headers: headers,
    });
  }

  deleteCategoryProduct(idProduct, idCategory) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.delete(
      Constants.BACKEND_URL +
      "/product/category/" +
      idProduct +
      "/" +
      idCategory,
      { headers: headers }
    );
  }

  toggleActive(idProduct, active) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", `Bearer ${this.getAuthorization()}`);
    return this.http.put(
      `${Constants.BACKEND_URL}/product/change-active/${idProduct}`,
      active,
      { headers }
    );
  }
  toggleArchive(idProduct, archive) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", `Bearer ${this.getAuthorization()}`);
    return this.http.put(
      `${Constants.BACKEND_URL}/product/change-archive/${idProduct}`,
      archive,
      { headers }
    );
  }

  getProductTemplate() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + "/product/template", {
      headers: headers,
      responseType: "blob",
    });
  }

  getTemplate() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/octet-stream")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + "/product/template-upload-packs",
      {
        headers: headers,
        responseType: "blob",
      }
    );
  }

  getReportProductWithoutStock() {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/octet-stream')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + '/product/export-product-out-stock', {
      headers: headers,
      responseType: 'blob'
    });
  }
  getVariatonFatherList() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + "/product/variation-father-list/all",
      { headers: headers }
    );
  }

  getVariationFatherById(idFather) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + "/product/variation-father/" + idFather,
      { headers: headers }
    );
  }

  checkValidFatherVariationActive(idFather) {
    const headers = new HttpHeaders().set("Content-type", "application/json").append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + "/product/valid-father-variation-active/" + idFather,
      { headers: headers }
    );
  }

  checkValidFatherChildren(idFather) {
    const headers = new HttpHeaders().set("Content-type", "application/json").append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + "/product/valid-father-children/" + idFather,
      { headers: headers }
    );
  }

  checkFatherActiveStatus(idFather) {
    const headers = new HttpHeaders().set("Content-type", "application/json").append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + "/product/valid-active/" + idFather,
      { headers: headers }
    );
  }

  changeMyFatherActiveStatus(idFather, active) {
    const body = {
      active
    }
    const headers = new HttpHeaders().set("Content-type", "application/json").append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      `${Constants.BACKEND_URL}/product/status-active/${idFather}`,
      body,
      { headers: headers }
    );
  }

}