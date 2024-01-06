import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardService } from 'src/app/shared/service/card.service';
import { LdvService } from 'src/app/shared/service/ldv.service';
const async = require('async')
@Component({
  selector: 'app-massive-cards',
  templateUrl: './massive-cards.component.html',
  styleUrls: ['./massive-cards.component.scss']
})
export class MassiveCardsComponent implements OnInit {
  processing: boolean;
  percentUpload: number;
  totalUpload: number;
  finishProcess: boolean;
  listUpload: Array<any>;
  showUpLoading: boolean;
  errors: any;
  finishUpload: boolean;
  listTypeDocument: Array<any>;
  constructor(
    private _cardService: CardService,
    private _ldvService: LdvService
  ) { }

  ngOnInit() {
    this.finishUpload = false
    this.errors = 0
    this.getListTypeDocument()
  }

  openprocess(listUpload) {
    this.listUpload = listUpload
    this.showUpLoading = true
    this.processStart()
  }
  async processStart() {
    this.totalUpload = 0
    this.processing = true;
    this.percentUpload = 0
    this.finishProcess = false;
    await this.uploadInfo();
    this.finishProcess = true;
    this.processing = false;
  }
  async uploadInfo() {
    const arraySend = []
    let arrayGroup = []
    const cantGroup = 20
    let fileIndex = 0
    for (const [index, file] of this.listUpload.entries()) {
      file.state = 'uploading';
      /* const codeString = (file['CODIGO DE SOCIO']).toString() */
      
      if(file['Codigo']) {
        const codeString = (file['Codigo']).toString()
        file.number = codeString.trimStart();
      }

      if(file['Tipo Documento']) {
        const typeDocumentString = (file['Tipo Documento']).toString()
        file.document_type_value = typeDocumentString.trim();
        const value = this.listTypeDocument.find(e => e.value === file.document_type_value)
        file.document_type_id = value._id
      }
      if(file['Numero Documento']) {
        const numberDocumentString = (file['Numero Documento']).toString()
        file.document_number = numberDocumentString.trim();
      }
      /* arrayGroup.push({ number: file.number }) */
      /* if(file.document_number && file.document_type_value && file.document_type_id) {
        fileIndex = fileIndex + 1
        arrayGroup.push({
          number: file.number, 
          document: {
            number: file.document_number,
            type: {
              _id: file.document_type_id,
              value: file.document_type_value,
            },
          },
          });
      } else {
        fileIndex = fileIndex + 1
        arrayGroup.push({ number: file.number });
      } */
      fileIndex = fileIndex + 1
        arrayGroup.push({
          number: file.number ? file.number : undefined, 
          document: {
            number: file.document_number ? file.document_number : undefined,
            type: {
              _id: file.document_type_id ? file.document_type_id : undefined,
              value: file.document_type_value ? file.document_type_value : undefined,
            },
          },
          });
      
      if ((fileIndex >= cantGroup) || ((index + 1) == this.listUpload.length)) {
        arraySend.push(arrayGroup)
        arrayGroup = []
        fileIndex = 0
      }
    }
    const waitromise = await new Promise((resolve, reject) => {
      async.eachLimit(arraySend, 1, async (group, callback) => {

        this._cardService.middlewareCreateCard({ listUpload: group }).subscribe(
          (okInfo: any) => {

            for (const answer of okInfo) {
              const file = this.listUpload.find(item => item.number == answer.number)
              if (file) {
                file.finish = true;
                file.state = 'ok';
                this.totalUpload = this.totalUpload + 1;
                file.message = answer.message
                if (!answer.action) {
                  file.state = 'ok_error';
                  this.errors = this.errors + 1;
                }
                if(answer.modified) {
                  file.state = 'ok_modified';
                }
              }
            }


            this.calcPercentUpload();
            callback();

          }, (error) => {

            this.totalUpload = this.totalUpload + 1;

            for (const answer of group) {
              const file = this.listUpload.find(item => item.number == answer.number)
              if (file) {
                file.errorSave = true;
                file.state = 'error';
              }
            }
            this.calcPercentUpload();
            callback();
          }
        )
      }, (err) => {

        console.log(err)
        if (err) {

          console.log(err)
          console.log('A file failed to process');
          reject()

        } else {

          this.finishProcess = true
          resolve({});

        }
      });
    });
    this.finishUpload = true;
    return waitromise;
  }

  getListTypeDocument() {
    const waitPromise = new Promise((resolve, reject) => {
      this._ldvService.getLdvDetail('TYPE-DOCUMENT-CUSTOMER').subscribe((response: any) => {
        this.listTypeDocument = response
        resolve({});
      });
    });
    return waitPromise;
  }

  calcPercentUpload() {
    this.percentUpload = (this.totalUpload * 100) / this.listUpload.length;

  }
  closeProcess() {
    this.showUpLoading = false
  }
}
