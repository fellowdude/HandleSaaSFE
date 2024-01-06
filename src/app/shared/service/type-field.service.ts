import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class TypeFieldService {

  constructor(private http: HttpClient) { }
  getAuthorization() {
    return btoa(localStorage.getItem('jwt'));
  }

  getAll() {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + '/type-field', { headers: headers });
  }
}
