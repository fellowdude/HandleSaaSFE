import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HeaderService } from '../components/header/header.service';
@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
})
export class WelcomeComponent implements OnInit {
  constructor(private router: Router,
    private headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.sendTitle("Inicio");
    setTimeout(() => {

      let existUrl
      if (localStorage.getItem("urlAllowed")) {
        const urlAllowed = JSON.parse(atob(localStorage.getItem("urlAllowed")));
        existUrl = urlAllowed.find(function (element) {
          return element == "/dashboard";
        });
      }

      if (existUrl) {
        this.router.navigate(["/system/dashboard"]);
      }
    }, 1500);
  }
}
