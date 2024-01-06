import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class EmailFormService {

  constructor(private http: HttpClient) { }
  getAuthorization() {
    return btoa(localStorage.getItem('jwt'));
  }

  getListEmailForm() {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + '/email-form/personalized', { headers: headers });
  }

  getById(idEmailForm) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + '/email-form/' + idEmailForm, { headers: headers });
  }
  getFilter(search, page, quantity) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + '/email-form/search', { headers: headers, params: { search: search, page: page, quantity: quantity } });
  }
  delete(idForm) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.delete(Constants.BACKEND_URL + '/email-form/' + idForm, { headers: headers });
  }


  update(idForm, data) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.put(Constants.BACKEND_URL + '/email-form/' + idForm, data, { headers: headers });
  }

  saveForm(data) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + '/email-form', data, { headers: headers });
  }

  sendEmail(data) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + '/email/email-template', data, { headers: headers });
  }
}
