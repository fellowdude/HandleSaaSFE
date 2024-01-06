import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/app/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class FilterCategoryService {

  constructor(private http: HttpClient) { }

  createFilter(data) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + btoa(localStorage.getItem('jwt')));
    return this.http.post(Constants.BACKEND_URL + '/category-filter', data, { headers: headers });
  }
  updateFilter(id, data) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + btoa(localStorage.getItem('jwt')));
    return this.http.put(Constants.BACKEND_URL + '/category-filter/' + id, data, { headers: headers });
  }
  GetFilterById(id) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + btoa(localStorage.getItem('jwt')));
    return this.http.get(Constants.BACKEND_URL + '/category-filter/' + id, { headers: headers });
  }
  GetAll() {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + btoa(localStorage.getItem('jwt')));
    return this.http.get(Constants.BACKEND_URL + '/category-filter/all', { headers: headers });
  }
  deleteFilter(id){
    const headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .append('Authorization', 'Bearer ' + btoa(localStorage.getItem('jwt')));
  return this.http.delete(Constants.BACKEND_URL + '/category-filter/' + id, { headers: headers });
  }
}
