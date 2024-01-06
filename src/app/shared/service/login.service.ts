import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../../utils/constants';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  getAuthorization() {
    return btoa(localStorage.getItem('jwt'));
  }

  create(key, body) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Key', 'Bearer ' + btoa(key));
    return this.http.post(Constants.BACKEND_URL + '/authorization/admin-staff', body, { headers: headers });
  }

  passwordReset(key, body) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Key', 'Bearer ' + btoa(key));
    return this.http.post(Constants.BACKEND_URL + '/authentication/send-mail-password-recovery-admin', body, { headers: headers });
  }

  recoveryPassword(jwt, body) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + btoa(jwt));
    return this.http.post(Constants.BACKEND_URL + '/authentication/recovery-password-admin', body, { headers: headers });
  }

  closeSession() {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.delete(Constants.BACKEND_URL + '/authentication/log-out', { headers: headers });
  }

  validKeyEnterprise() {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
    return this.http.get(Constants.BACKEND_URL + '/authorization/enterprise-token', { headers: headers });
  }
}
