import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MiddleService } from './middle.service';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private router: Router, private _middleware: MiddleService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf("/payu") != -1 || request.url.indexOf("/production-pass") != -1) {
      return next.handle(request)
    }
    return next.handle(request)
      .pipe(catchError(response => {
        if (response instanceof HttpErrorResponse) {
          if (response.error.close_session) {
            this._middleware.sendMessage('Inicie Sesión', 'Su sesión ha expirado', 'error')
            localStorage.clear();
            sessionStorage.clear();
            this.router.navigate(["/public"]);

            this._middleware.sendLoading(false)
          }
        }
        return throwError(response);
      }));
  }
}
