import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Constants } from "src/app/utils/constants";

@Injectable({
  providedIn: "root"
})
export class FlowRequestService {
  constructor(private http: HttpClient) {}

  createFlowequest(data) {
    const headers = new HttpHeaders()
      .set("Content-type", "application/json")
      .append("Authorization", "Bearer " + btoa(localStorage.getItem("jwt")));
    return this.http.post(Constants.BACKEND_URL + "/flow-approval", data, {
      headers: headers
    });
  }

  updateFlowequest(id, data) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + btoa(localStorage.getItem('jwt')));
    return this.http.put(Constants.BACKEND_URL + '/flow-approval/' + id, data, { headers: headers });
  }
  GetFilterById(id) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + btoa(localStorage.getItem('jwt')));
    return this.http.get(Constants.BACKEND_URL + '/flow-approval/' + id, { headers: headers });
  }
  GetAll() {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + btoa(localStorage.getItem('jwt')));
    return this.http.get(Constants.BACKEND_URL + '/flow-approval/all', { headers: headers });
  }
  deleteFilter(id){
    const headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .append('Authorization', 'Bearer ' + btoa(localStorage.getItem('jwt')));
  return this.http.delete(Constants.BACKEND_URL + '/flow-approval/' + id, { headers: headers });
  }
}
