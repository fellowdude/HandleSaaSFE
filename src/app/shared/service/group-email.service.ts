import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class GroupEmailService {
  constructor(private http: HttpClient) {}

  getAuthorization() {
    return btoa(localStorage.getItem('jwt'));
  }

  create(data) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + '/group-email', data, {
      headers: headers
    });
  }

  getAll(search, page, quantity) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + '/group-email/search', {
      headers: headers,
      params: { search: JSON.stringify(search), page: page, quantity: quantity }
    });
  }

  getList() {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + '/group-email', {
      headers: headers
    });
  }

  getById(idExperience) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.get(
      Constants.BACKEND_URL + '/group-email/' + idExperience,
      { headers: headers }
    );
  }

  update(idExperience, data) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + '/group-email/' + idExperience,
      data,
      { headers: headers }
    );
  }

  delete(idExperience) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.delete(
      Constants.BACKEND_URL + '/group-email/' + idExperience,
      { headers: headers }
    );
  }
}
