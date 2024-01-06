import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ContactEmailService {
  constructor(private http: HttpClient) {}

  getAuthorization() {
    return btoa(localStorage.getItem('jwt'));
  }

  delete(idContactEmail) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.delete(Constants.BACKEND_URL + '/contact-email/' + idContactEmail, { headers: headers });
  }

  getById(idContactEmail) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + '/contact-email/' + idContactEmail, { headers: headers });
  }

  updateContact(idContact, data) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.put(Constants.BACKEND_URL + '/contact-email/' + idContact, data, {
      headers: headers
    });
  }

  saveContact(data) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + '/contact-email', data, {
      headers: headers
    });
  }
}
