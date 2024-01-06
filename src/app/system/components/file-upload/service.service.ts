import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  getAuthorization() {
    return btoa(localStorage.getItem('jwt'));
  }
  uploadFile(data: FormData, suplierId: string) {
    if (suplierId && suplierId != null) {
      suplierId = '/' + suplierId;
    } else {
      suplierId = '';
    }
    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + '/attachment' + suplierId, data, { headers: headers });
  }

  uploadFileMasive(data: FormData, supplierId) {

    const headers = new HttpHeaders()
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + '/attachment', data, { headers: headers, params: { supplierId } });
  }

  validImageBD(data: FormData, supplierId: any) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + '/attachment/verify-image', data, { headers: headers, params: { supplierId } });
  }
}
