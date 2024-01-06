import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }
  getAuthorization() {
    return btoa(localStorage.getItem('jwt'));
  }

  sendEmail(supplierId: string, orderId: string) {
    debugger
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + '/payments/send_email_supplier' + `/${supplierId}/${orderId}`, null, { headers: headers });
  }
}
