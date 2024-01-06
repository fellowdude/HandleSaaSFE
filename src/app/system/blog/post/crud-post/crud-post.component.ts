import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { DynamicTreeViewComponent } from "src/app/system/components/dynamic-tree-view/dynamic-tree-view.component";
import { MiddleService } from "src/app/shared/service/middle.service";
import { CategoryService } from "src/app/shared/service/category.service";
import { UtilsCode } from "src/app/utils/utilsCode";
import { MultimediaGalleryComponent } from "src/app/system/components/multimedia-gallery/multimedia-gallery.component";
import { PostService } from "src/app/shared/service/post.service";
import { Subscription } from "rxjs";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { DialogConfirmComponent } from "src/app/system/components/dialog-confirm/dialog-confirm.component";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { AuthorBlogService } from 'src/app/shared/service/author-blog.service';
import { LdvService } from "src/app/shared/service/ldv.service";
export interface IPostDetail {
  type: "text" | "image";
  value: any;
}
@Component({
  selector: "app-crud-post",
  templateUrl: "./crud-post.component.html",
  styleUrls: ["./crud-post.component.scss"],
})
export class CrudPostComponent implements OnInit {
  listAuthor: Array<any>

  listSKUProduct: any;
  idPost: String;
  postForm: FormGroup;
  @ViewChild("categoryTree", { static: false })
  selectableCategory: DynamicTreeViewComponent;
  listCategory: Array<any>;
  duplicateSKU: boolean;
  selectCategory: any;
  groupList: any;
  listCategoriesFilter: Array<any>;
  lisBannerAddPicture: any;
  lisFeactureAddPicture: any
  selectMuti: any;
  selectPicture: any;
  url_attachment: string;
  routerSubscription: Subscription;
  @ViewChild("multimediaList", { static: true })
  multimediaGallery: MultimediaGalleryComponent;
  @ViewChild("multimediaPost", { static: true })
  multimediaGalleryPost: MultimediaGalleryComponent;
  @ViewChild("dialogDelete", { static: true })
  dialogConfirm: DialogConfirmComponent;
  submitted: boolean;
  listPostDetail: Array<IPostDetail>;
  availableUpdate: boolean;
  availableDelete: boolean;
  availableCreate: boolean;
  headerFixed: boolean;
  listAddSku: any;
  tinyEditorConfig
  listImageField: any
  listImageDimension: any
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listAddSku, event.previousIndex, event.currentIndex);
  }

  constructor(
    private middleService: MiddleService,
    private serviceCategory: CategoryService,
    private _categoryService: CategoryService,
    private _postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _authorService: AuthorBlogService,
    private _ldvService: LdvService
  ) {
    this.routerSubscription = this.router.events.subscribe((change) => {
      if (change instanceof NavigationEnd) {
        this.idPost = this.activatedRoute.snapshot.params["id"];
      }
    });
    this.listImageField = {}
    this.listImageDimension = {}
    this.url_attachment = localStorage.getItem("url_attachment");
    this.postForm = new FormGroup({
      active: new FormControl(false, [Validators.required]),
      featured: new FormControl(false),
      group: new FormControl("", [Validators.required]),
      title: new FormControl("", [Validators.required]),
      friendly_url: new FormControl("", [Validators.required]),
      image_banner: new FormControl(null),
      featured_image: new FormControl(null),
      categories: new FormControl(null),
      detail: new FormControl("", [Validators.required]),
      post_detail: new FormControl(null),
      code: new FormControl("", [Validators.required]),
      related_post: new FormControl(null),
      search_sku: new FormControl(""),
      author: new FormControl(null),
      publication_date: new FormControl(null, [Validators.required]),
    });
    this.tinyEditorConfig = {
      /*  height: '200px', */
      menubar: false,
      plugins: [
        'advlist autolink lists link image charmap print autoresize',
        'preview anchor searchreplace visualblocks code',
        'fullscreen insertdatetime media table paste',
        'help wordcount '
      ],
      toolbar:
        'undo redo | formatselect | fontsizeselect | bold italic | \
         alignleft aligncenter alignright alignjustify | \
         bullist numlist outdent indent forecolor backcolor | table tabledelete'
    }
  }

  @HostListener("scroll", ["$event"]) private onScroll($event: Event): void {
    $event.srcElement.addEventListener("scroll", this.scrollEvent, true);
  }

  ngOnInit() {
    this.getAllAuthor()
    this.getProductImageSize()
    this.getProductImageDimension()
    this.listAuthor = []
    this.duplicateSKU = false;
    this.availableUpdate = false;
    this.availableDelete = false;
    this.availableCreate = false;
    this.listPostDetail = [];
    this.submitted = false;
    this.headerFixed = false;
    this.lisBannerAddPicture = [];
    this.lisFeactureAddPicture = []
    this.selectCategory = [];
    this.listCategoriesFilter = [];
    this.listAddSku = [];
    this.listSKUProduct = [];
    this.onChanges();
    this.getListGroup();
    if (this.idPost) {
      this.getDataPost();
    }
    this.validCreate();

  }

  get f() {
    return this.postForm.controls;
  }

  onChanges(): void {
    this.postForm.get("search_sku").valueChanges.subscribe((val) => {

      if (val) {
        if (val.length > 2) {
          this.searchSKU(val, "listSKUProduct");
        }
      }

    });

    this.postForm.get("title").valueChanges.subscribe((val) => {
      this.postForm.get("friendly_url").setValue(UtilsCode.cleanString(val));
    });

    this.postForm.get("group").valueChanges.subscribe((val) => {
      this.getListCategory(val);
    });
  }

  searchSKU(sku, field) {

    this._postService.searchSKU(sku).subscribe(
      (listProduct) => {

        this[field] = listProduct;
      },
      (error) => {
        this.middleService.sendMessage(
          "Producto",
          error.error.message,
          "error"
        );
      }
    );
  }


  selectImageMainWeb($event, entity) {
    this.selectPicture = entity
    this.dataPictureSave($event.image)
  }


  getAllAuthor() {
    this._authorService.getAll().subscribe(
      (listAuthor: Array<any>) => {

        this.listAuthor = listAuthor
      }, (error) => {
        this.middleService.sendMessage('Publicación', error.error.message, 'error')
      }
    )
  }

  addSKU(valueSKU, field, entity) {
    if (this.idPost == valueSKU._id) {
      this.middleService.sendMessage('Publicaciones', 'No puedes agregar la misma publicación', 'error')
    } else {
      const searchExist = this[field].filter(function (el) {
        return el.code === valueSKU.code;
      });

      if (searchExist.length > 0) {
        this["duplicate" + entity] = true;
        setTimeout(() => {
          this["duplicate" + entity] = false;
        }, 2000);
      } else {
        this[field].push(valueSKU);
      }
      setTimeout(() => {
        this.postForm.get("search_sku").setValue("");
      }, 0);
    }

  }

  acceptModal(event) {
    if (event.accept) {
      this.deletItem();
    }
  }

  deleteSkuList(index, field) {
    this[field].splice(index, 1);
  }

  deletItem() {
    this.middleService.sendLoading(true);
    this._postService.delete(this.idPost).subscribe(
      (data) => {
        this.middleService.sendLoading(false);
        this.middleService.sendMessage(
          "Publicación",
          "La publicación ha sido eliminada correctamente",
          "ok"
        );
        this.router.navigate(["/system/blog/post"]);
      },
      (error) => {
        this.middleService.sendLoading(false);
        this.middleService.sendMessage(
          "Publicación",
          error.error.message,
          "error"
        );
      }
    );
  }

  confirmDeleteItem(idItem) {
    this.dialogConfirm.show(
      "Eliminar Publicación",
      "¿Esta seguro de eliminar?"
    );
  }

  addDetail(type) {
    this.listPostDetail.push({ type, value: null });
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
        const availableUpdate = listOperation[indexBlog].functionalities[
          funtionalityIndex
        ].operations.find((item) => item.action == "update");
        if (availableUpdate) {
          this.availableUpdate = true;
        }

        const availableCreate = listOperation[indexBlog].functionalities[
          funtionalityIndex
        ].operations.find((item) => item.action == "update");
        if (availableCreate) {
          this.availableCreate = true;
        }

        const availableDelete = listOperation[indexBlog].functionalities[
          funtionalityIndex
        ].operations.find((item) => item.action == "delete");
        if (availableDelete) {
          this.availableDelete = true;
        }
      }
    }
  }

  getDataPost() {
    this.middleService.sendLoading(true);
    this._postService.getById(this.idPost).subscribe(
      (dataPost: any) => {
        if (dataPost.post_detail) {
          this.listPostDetail = dataPost.post_detail;
        }
        this.middleService.sendLoading(false);
        this.fillInfoPost(dataPost);
      },
      (error) => {
        this.router.navigate(["/system/blog/post"]);
        this.middleService.sendMessage(
          "Publicaciones",
          error.error.message,
          "error"
        );
      }
    );
  }

  returnPosts() {
    this.router.navigate(["/system/blog/post"]);
  }

  scrollEvent = (event: any): void => {
    const number = event.srcElement.scrollTop;
    if (number >= 33) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  };

  async fillInfoPost(dataPost) {
    this.selectCategory = dataPost.categories;
    this.postForm.patchValue(dataPost);
    this.lisBannerAddPicture = [];
    this.lisFeactureAddPicture = []
    if (dataPost.image_banner) {
      this.lisBannerAddPicture.push(dataPost.image_banner);
    }

    if (dataPost.featured_image) {
      this.lisFeactureAddPicture.push(dataPost.featured_image);
    }

    if (dataPost.related_post) {
      this.listAddSku = dataPost.related_post;
    }
  }

  searchCategoryChecked(listObj) {
    if (!listObj.children) {
      if (listObj.checked) {
        this.selectCategory.push(listObj._id);
      }
    } else {
      if (listObj.checked) {
        this.selectCategory.push(listObj._id);
      }
      for (const categoryChildren of listObj.children) {
        this.searchCategoryChecked(categoryChildren);
      }
    }
  }

  save() {
    this.submitted = true;
    this.selectCategory = [];
    for (const category of this.listCategory) {
      this.searchCategoryChecked(category);
    }
    this.postForm.get("categories").setValue(this.selectCategory);
    if (this.lisBannerAddPicture.length > 0) {
      this.postForm.get("image_banner").setValue(this.lisBannerAddPicture[0]);
    } else {
      this.postForm.get("image_banner").setValue("");
    }

    if (this.lisFeactureAddPicture.length > 0) {
      this.postForm.get("featured_image").setValue(this.lisFeactureAddPicture[0]);
    } else {
      this.postForm.get("featured_image").setValue("");
    }

    if (!this.postForm.invalid) {
      this.postForm.get("related_post").setValue(this.listAddSku);
      this.postForm.get("post_detail").setValue(this.listPostDetail);
      this.middleService.sendLoading(true);
      if (this.idPost) {
        this._postService.update(this.idPost, this.postForm.value).subscribe(
          (updateInfo) => {
            this.middleService.sendLoading(false);
            this.middleService.sendMessage(
              "Publicaciones",
              "Su publicación ha sido actualizada.",
              "ok"
            );
          },
          (error) => {
            this.middleService.sendLoading(false);
            this.middleService.sendMessage(
              "Publicaciones",
              error.error.message,
              "error"
            );
          }
        );
      } else {
        this._postService.save(this.postForm.value).subscribe(
          (saveInfo: any) => {
            this.router.navigate([
              "/system/blog/post/detail/" + saveInfo.idPost,
            ]);
            this.middleService.sendLoading(false);
            this.middleService.sendMessage(
              "Publicaciones",
              "Su publicación ha sido creado.",
              "ok"
            );
          },
          (error) => {
            this.middleService.sendLoading(false);
            this.middleService.sendMessage(
              "Publicaciones",
              error.error.message,
              "error"
            );
          }
        );
      }
    } else {
      this.middleService.sendMessage(
        "Publicaciones",
        "Revise los campos obligatorios.",
        "error"
      );
    }
  }

  getListGroup() {
    this._categoryService.getListCategoryGroup().subscribe((listGroup: any) => {

      const searchExperience = listGroup.find(
        (item) => item.friendly_url == "blog"
      );
      if (searchExperience) {
        this.groupList = listGroup;
        this.postForm.get("group").setValue(searchExperience._id);
      }
    });
  }

  getProductImageSize() {
    const waitPromise = new Promise((resolve, reject) => {
      this._ldvService.getLdvSearch('SONR-SIZE-IMAGE', { window: 'blog' }).subscribe(
        (listInfo: any) => {
          if (listInfo.length > 0) {
            this.listImageField = listInfo[0].value
            console.log('oooooooooooooooooooooooooooooooo')
            console.log(this.listImageField)
          }
          resolve({})
        }, (error) => {
          resolve({})
          this.middleService.sendMessage('Producto', error.error.message, 'error')
        }
      )
    });
    return waitPromise;
  }

  getProductImageDimension() {
    const waitPromise = new Promise((resolve, reject) => {
      this._ldvService.getLdvSearch('SONR-DIMENSION-IMAGE', { window: 'blog' }).subscribe(
        (listInfo: any) => {
          if (listInfo.length > 0) {
            this.listImageDimension = listInfo[0].value
            console.log('iiiiiiiiiiii')
            console.log(this.listImageDimension)
          }
          resolve({})
        }, (error) => {
          this.middleService.sendMessage('Producto', error.error.message, 'error')
          resolve({})
        }
      )
    });
    return waitPromise;
  }

  deleteImage(position, field) {
    this[field].splice(this[field].length - position, 1);
  }

  showWindowMultimedia(field, multi, replacePosition?, maxSize?, maxDimension?) {
    this.selectMuti = false;
    this.selectMuti = multi;
    this.multimediaGallery.config.maxImageSelect = 1;
    this.multimediaGallery.config.maxSize = maxSize
    this.multimediaGallery.config.maxDimension = maxDimension
    if (multi) {
      this.multimediaGallery.config.typeInfo = "multi";
      this.multimediaGallery.config.maxImageSelect = null;
    }
    this.selectPicture = field;
    this.multimediaGallery.getAllMultimedia();
    this.multimediaGallery.openWindow();
  }

  addImagePublic(position, maxSize?, maxDimension?) {
    this.multimediaGalleryPost.config.maxImageSelect = 1;
    this.multimediaGalleryPost.config.maxSize = maxSize
    this.multimediaGalleryPost.config.maxDimension = maxDimension
    this.selectPicture = position;
    this.multimediaGalleryPost.getAllMultimedia();
    this.multimediaGalleryPost.openWindow();
  }

  deleteSection(position) {
    this.listPostDetail.splice(position, 1);
  }
  deleteImagePost(position) {
    this.listPostDetail[position].value = null;
  }

  selectImageMainPost($event, entity) {
    this.selectPicture = entity
    this.dataPicturePost($event.image)
  }


  dataPicturePost($event) {
    if ($event.length > 0) {
      this.listPostDetail[this.selectPicture].value = $event;
    }
  }

  dataPictureSave($event) {
    if (this.selectMuti) {
      for (const picture of $event) {
        this[this.selectPicture].push(picture);
      }
    } else {
      if ($event.length > 0) {
        this[this.selectPicture].push($event);
      }
    }
  }

  getListCategory(group) {
    this.middleService.sendLoading(true);
    this.serviceCategory.getAllCategory(group).subscribe(
      (listCategory: any) => {
        this.middleService.sendLoading(false);
        this.listCategory = JSON.parse(JSON.stringify(listCategory));
        this.selectableCategory.fillDataSource(this.listCategory);
        this.checkedCategory();
      },
      () => { }
    );
  }

  checkedCategory() {
    if (this.listCategory) {
      for (const category of this.selectCategory) {
        for (const node of this.listCategory) {
          this.recursiveCheckedCheck(node, category, "children");
        }
      }
    }
  }

  recursiveCheckedCheck(node: any, categorieSearch, statusSearch) {
    if (!node.children) {
      if (node._id === categorieSearch) {
        node.checked = true;
      }
    } else {
      if (node._id === categorieSearch) {
        node.checked = true;
      }

      for (const children of node.children) {
        this.recursiveCheckedCheck(children, categorieSearch, statusSearch);
      }
    }
  }

  displayFilters($event) {
    this.middleService.sendLoading(true);
    const index = this.selectCategory.findIndex(
      (category) => category == $event._id
    );

    if (index == -1) {
      this.selectCategory = [...this.selectCategory, $event._id];
    } else {
      $event.filters &&
        $event.filters.forEach((filter) => {
          const filterIndex = this.listCategoriesFilter.findIndex((object) => {
            return filter._id == object._id;
          });
          filterIndex !== -1 &&
            this.listCategoriesFilter.splice(filterIndex, 1);
        });

      this.selectCategory.splice(index, 1);
    }

    this._categoryService
      .getCategoriesFiltersByCategoryArray(this.selectCategory)
      .subscribe((response: Array<any>) => {
        response.forEach((element) => {
          element.filters.forEach((filter) => {
            const exists = this.listCategoriesFilter.find(
              (object) => filter.filter._id == object.filter._id
            );
            if (!exists && !filter.filter.binded) {
              this.listCategoriesFilter.push(filter);
            }
          });
        });
        this.middleService.sendLoading(false);
      });
  }
}
