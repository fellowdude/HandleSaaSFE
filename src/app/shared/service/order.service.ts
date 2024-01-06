import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }
  getAuthorization() {
    return btoa(localStorage.getItem('jwt'));
  }

  changeAttended(id, body) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + '/order/change-attended/' + id, body,
      { headers: headers }
    );
  }

  changeStatus(idOrder, newStatus) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + '/order/change-status/' + idOrder, newStatus,
      { headers: headers }
    );
  }

  calcTotalOrder(data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.post(
      Constants.BACKEND_URL + '/order/calc-total-detail', data,
      { headers: headers }
    );
  }

  getReportSale(params) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/octet-stream')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + '/order/report-sale', {
      headers: headers,
      params,
      responseType: 'blob'
    });
  }

  getBiweeklySales() {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + '/order/graphs/lastBiweeklySales', { headers: headers });
  }

  getLastMonthCategorySales() {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + '/order/graphs/lastMonthCategorySales', { headers: headers });
  }

  fillCardStas() {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/octet-stream')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + '/order/fill-card-stats', {
      headers: headers
    });
  }

  supplierExtraInfo() {
    const headers = new HttpHeaders()
      .set("Content-type", "application/octet-stream")
      .append("Authorization", "Bearer " + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + '/order/supplier-extra-info', {
      headers: headers
    });
  }

  getTop10() {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + '/order/top10', { headers: headers });
  }

  getListReportSale(params) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + '/order/list-report-admin', {
      headers: headers,
      params
    });
  }

  getLastOrder() {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/octet-stream')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + '/order/last-order', {
      headers: headers
    });
  }

  findbyCustomer(idUser) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/octet-stream')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + '/order/order-customer/' + idUser, {
      headers: headers
    });
  }

  findOrder(idOrder) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/octet-stream')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + '/order/' + idOrder, {
      headers: headers
    });
  }
}
