import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { GridComponent } from "src/app/system/components/grid/grid.component";
import { HeaderService } from 'src/app/system/components/header/header.service';

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export class PostComponent implements OnInit {
  availableCreate: boolean;
  availableDelete: boolean;
  @ViewChild("gridList", { static: true }) gridList: GridComponent;
  constructor(private router: Router, private headerService: HeaderService) {}

  ngOnInit() {
    this.headerService.sendTitle("Publicaciones");
    this.availableCreate = false;
    this.availableDelete = false;
    this.gridList.columns = [
      {
        field: "code",
        title: "Código",
        type: "text",
        align:"center",
        width:"200px"
      },
      {
        field: "title",
        title: "Título",
        type: "text",
      },
    ];
    this.gridList.config.pagQuantity = 20;
    this.gridList.config.getService = "/post/search";
    this.gridList.config.redirect = "system/blog/post/detail/";
    this.gridList.config.entity = "Publicaciones";
    
    this.gridList.config.deleteMessage =
      "La publicación ha sido eliminado correctamente";
    this.validCreate();
  }

  createPost() {
    this.router.navigate(["/system/blog/post/new"]);
  }

  validCreate() {
    const listOperation = JSON.parse(
      atob(localStorage.getItem("urlAllowedOperations"))
    );
    const indexBlog = listOperation.findIndex((item) => item.module == "Blog");
    if (indexBlog >= 0) {
      const funtionalityIndex = listOperation[
        indexBlog
      ].functionalities.findIndex((item) => item.module == "Blog");
      if (funtionalityIndex >= 0) {
        const availableCreate = listOperation[indexBlog].functionalities[
          funtionalityIndex
        ].operations.find((item) => item.action == "create");
        if (availableCreate) {
          this.availableCreate = true;
        }

        const availableDelete = listOperation[indexBlog].functionalities[
          funtionalityIndex
        ].operations.find((item) => item.action == "delete");
        if (availableDelete) {
          this.gridList.config.deleteService = "/post";
          this.availableDelete = true;
        }
      }
    }
  }
}
