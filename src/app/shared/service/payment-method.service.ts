import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  constructor(private http: HttpClient) {}
  getAuthorization() {
    return btoa(localStorage.getItem('jwt'));
  }
  getAllPaymentMethod() {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + '/payment-method-enterprise', {
      headers: headers
    });
  }

  statePaymentMethod(idPayment, state) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.put(
      Constants.BACKEND_URL + '/payment-method-enterprise/state/' + idPayment,
      { state: state },
      {
        headers: headers
      }
    );
  }
}
