import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { ServiceService } from './service.service';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Output() infoFile = new EventEmitter<any>();
  public config: any = {}
  uploadForm: FormGroup;
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });
  title: String = 'Angular File Upload';
  constructor(private fb: FormBuilder, private service: ServiceService) { }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      document: [null, null],
    });
  }

  uploadSubmit() {

    for (let i = 0; i < this.uploader.queue.length; i++) {
      const fileItem = this.uploader.queue[i]._file;
      if (fileItem.size > 10000000) {
        alert('Each File should be less than 10 MB of size.');
        return;
      }
    }

    const data = new FormData();
    for (let j = 0; j < this.uploader.queue.length; j++) {
      const fileItem = this.uploader.queue[j]._file;
      data.append('file', fileItem);
    }
    data.append('fileSeq', 'seq');
    this.service.uploadFile(data, null).subscribe(
      (dataReq) => {
        this.infoFile.emit(dataReq);
      }
    );
    this.uploader.clearQueue();
  }
}
