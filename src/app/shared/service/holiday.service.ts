import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor(private http: HttpClient) { }

  delete(idHoliday) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.delete(Constants.BACKEND_URL + '/holiday/' + idHoliday, { headers: headers });
  }
  getAuthorization() {
    return btoa(localStorage.getItem('jwt'));
  }

  getCalendar(month, year) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + '/holiday/listHoliday/' + month + '/' + year, { headers: headers });
  }

  update(idProduct, data) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.put(Constants.BACKEND_URL + '/holiday/' + idProduct, data, { headers: headers });
  }

  saveProduct(data) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + '/holiday', data, { headers: headers });
  }
}
