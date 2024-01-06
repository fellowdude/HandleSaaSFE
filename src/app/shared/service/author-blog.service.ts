import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthorBlogService {
  constructor(private http: HttpClient) { }

  getAuthorization() {
    return btoa(localStorage.getItem('jwt'));
  }

  delete(idAuthor) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.delete(Constants.BACKEND_URL + '/author-blog/' + idAuthor, { headers: headers });
  }

  getById(idAuthor) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + '/author-blog/' + idAuthor, { headers: headers });
  }

  getAll() {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.get(Constants.BACKEND_URL + '/author-blog/all', { headers: headers });
  }

  updateContact(idContact, data) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.put(Constants.BACKEND_URL + '/author-blog/' + idContact, data, {
      headers: headers
    });
  }

  saveContact(data) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.post(Constants.BACKEND_URL + '/author-blog', data, {
      headers: headers
    });
  }
}
