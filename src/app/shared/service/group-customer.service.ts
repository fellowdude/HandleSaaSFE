import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class GroupCustomerService {

  constructor(private http: HttpClient) { }

  getAuthorization() {
    return btoa(localStorage.getItem('jwt'));
  }

  create(data) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + '/group-customer', data, {
      headers: headers
    });
  }

  getById(idCustomerGroup) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + '/group-customer/' + idCustomerGroup,
      { headers: headers }
    );
  }

  update(idCustomerGroup, data) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + '/group-customer/' + idCustomerGroup,
      data,
      { headers: headers }
    );
  }

  delete(idCustomerGroup) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.delete(
      Constants.BACKEND_URL + '/group-customer/' + idCustomerGroup,
      { headers: headers }
    );
  }

  getAllGroups() {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + '/group-customer' ,
      { headers: headers }
    );
  }
}
