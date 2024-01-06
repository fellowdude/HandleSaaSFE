import { Component, OnInit, Input, Inject, ElementRef, ViewChild } from '@angular/core';
import { Constants } from 'src/app/utils/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DOCUMENT } from '@angular/common';
import { AttachmentService } from 'src/app/shared/service/attachment.service';
import { MiddleService } from 'src/app/shared/service/middle.service';

@Component({
  selector: 'app-option-image-menu',
  templateUrl: './option-image-menu.component.html',
  styleUrls: ['./option-image-menu.component.scss']
})
export class OptionImageMenuComponent implements OnInit {
  @Input() imageSearch: any
  url_attachment: string
  searchCopy: any
  constructor(
    private _snackBar: MatSnackBar,
    private _attachmentService: AttachmentService,
    private _middleService: MiddleService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.url_attachment = localStorage.getItem("url_attachment");
  }

  ngOnInit() {
    this.searchCopy = { value: '' }
  }

  copyTextMessage() {
    const goApi = this.searchName()
    if (goApi) {
      this._middleService.sendLoading(true)
      this._attachmentService.getName(this.imageSearch).subscribe(
        (name: any) => {
          this._middleService.sendLoading(false)
          let nameCopy = name.name
          const newName = nameCopy.split('.')
          if (newName.length > 0) {
            nameCopy = newName[0]
          }
          navigator.clipboard.writeText(nameCopy).then(() => {
            this.openSnackBar('nombre copiado')
          }, () => {
            this.openSnackBar('no se pudo copiar el nombre')
          });
        }, (error) => {
          this._middleService.sendLoading(false)
          this._middleService.sendMessage('', error.error.message, 'error')
        }
      )

    } else {
      this.openSnackBar('nombre de imagen no disponible')
    }
  }

  openSnackBar(text) {
    this._snackBar.open(text, 'Cerrar', {
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "center"
    })
  }
  searchName() {
    let goApi = false
    if (typeof this.imageSearch == 'object') {
      const searchTypeImage = this.imageSearch[0].split('/')
      if (searchTypeImage[1] == 'storage-attachment') {
        goApi = true
      }
      this.imageSearch = this.imageSearch[0]
    }
    else {
      const searchTypeImage = this.imageSearch.split('/')
      if (searchTypeImage[1] == 'storage-attachment') {
        goApi = true
      }
    }

    return goApi
  }

  openImage() {
    const goApi = this.searchName()
    if (goApi) {
      window.open(Constants.BACKEND_URL + '/storage-img?url=' + JSON.stringify({ url: this.url_attachment + this.imageSearch }), "_blank")
    } else {
      window.open(this.url_attachment + this.imageSearch, "_blank")
    }
  }

}
