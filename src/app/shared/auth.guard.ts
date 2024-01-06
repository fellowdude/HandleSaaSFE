import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const url = window.location.href;
    if (localStorage.getItem("urlAllowed")) {
      const urlAllowed = JSON.parse(atob(localStorage.getItem("urlAllowed")));
      urlAllowed.push("/profile");
      urlAllowed.push("/supplier");
      urlAllowed.push("/notifications/center");
      let searchUrl = url.split("system")[1];
      if (searchUrl) {
        const isNew = searchUrl.split("/new");
        if (isNew.length > 1) {
          searchUrl = isNew[0];
        }
        const isParam = searchUrl.split("detail");
        if (isParam.length > 1) {
          searchUrl = isParam[0].slice(0, -1);
        }
        const existUrl = urlAllowed.find(function (element) {
          return element == searchUrl;
        });
        if (existUrl) {
          return true;
        } else {
          this.router.navigate(["/notFound"]);
          return true;
        }
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
}
