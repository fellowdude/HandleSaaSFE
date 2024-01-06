import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit, OnDestroy {

  dateRangeForm: FormGroup;
  hourTime: any;
  showModalTime: boolean;
  changeValueSubscription: Subscription;
  valueObjSend: any;
  submitted: boolean;

  constructor(private middleService: MiddleService) {

    this.dateRangeForm = new FormGroup({
      date_start: new FormControl(null),
      hour_start: new FormControl(null, [Validators.required]),
      date_end: new FormControl(null),
      hour_end: new FormControl(null),
    });
  }

  ngOnInit() {
    this.changeValueSubscription = this.middleService.getChangeDateRange().subscribe(changeValue => {
      this.valueObjSend = changeValue.value;
      if (changeValue.data) {
        this.changeIniDate(changeValue.data);
      } else {
        this.dateRangeForm.reset();
      }
    });
    this.showModalTime = false;
    this.hourTime = {};
    this.onChanges();

  }
  get f() { return this.dateRangeForm.controls; }
  ngOnDestroy() {
    this.changeValueSubscription.unsubscribe();
  }

  addTime(field) {
    if ((field == "hour" && this.hourTime[field] == "23") || field == "minute" && this.hourTime[field] == "59") {
      this.hourTime[field] = "00";
    } else {
      this.hourTime[field]++;
      this.hourTime[field] = this.hourTime[field].toString();
      this.hourTime[field].length == 1 && (this.hourTime[field] = '0' + this.hourTime[field]);
      this.validTimer(field, this.hourTime[field]);
    }
  }

  changeIniDate(data) {
    this.dateRangeForm.get('date_start').setValue(data.date_start);
    this.dateRangeForm.get('date_end').setValue(data.date_end);
    this.dateRangeForm.get('hour_start').setValue(data.hour_start);
    this.dateRangeForm.get('hour_end').setValue(data.hour_end);
  }

  closeModalTime() {
    this.showModalTime = false;

  }

  downTime(field) {
    if (field == "hour" && this.hourTime[field] == "00") {
      this.hourTime[field] = "23";
    } else if (field == "minute" && this.hourTime[field] == "00") {
      this.hourTime[field] = "59";
    } else {
      this.hourTime[field]--;
      this.hourTime[field] = this.hourTime[field].toString();
      this.hourTime[field].length == 1 && (this.hourTime[field] = '0' + this.hourTime[field]);
      this.validTimer(field, this.hourTime[field]);
    }
  }
  openModalTime(moment) {
    this.hourTime.hour = "00";
    this.hourTime.minute = "00";
    this.hourTime.errorSave = false;

    if (this.f[moment].value) {
      typeof(this.f[moment].value) === "string" && (this.f[moment].setValue(new Date(this.f[moment].value)));
      this.hourTime.hour =   (this.f[moment].value).getHours();
      this.hourTime.minute = (this.f[moment].value).getMinutes();
    }
    this.hourTime.hour.toString().length === 1 && (this.hourTime.hour = "0"+this.hourTime.hour.toString());
    this.hourTime.minute.toString().length === 1 && (this.hourTime.minute = "0"+this.hourTime.minute.toString());
    this.hourTime.moment = moment;
    this.showModalTime = true;
  }

  onChanges(): void {
    this.dateRangeForm.get('date_end').valueChanges.subscribe(val => {
      this.validSetTime();
      if (this.hourTime.errorSave) {
        this.dateRangeForm.get('hour_end').setValue(null);
        this.hourTime.errorCalendar = true;
      }
    });
    this.dateRangeForm.get('date_start').valueChanges.subscribe(val => {
      this.validSetTime();
      if (this.hourTime.errorSave) {
        this.dateRangeForm.get('hour_start').setValue(null);
        this.hourTime.errorCalendar = true;
      }
    });
  }

  saveTime() {
    this.validSetTime();
    if (!this.hourTime.errorSave) {
      const newDateStart = new Date(0, 0, 0, this.hourTime.hour, this.hourTime.minute, 0);
      this.dateRangeForm.get(this.hourTime.moment).setValue(newDateStart);
      const sendObj: any = {};
      sendObj.date_start = this.f.date_start.value;
      sendObj.date_end = this.f.date_end.value;
      sendObj.hour_start = this.f.hour_start.value;
      sendObj.hour_end = this.f.hour_end.value;
      this.middleService.sendDateRange(this.valueObjSend, sendObj);
      this.closeModalTime();
    }
  }

  validSetTime() {
    const infoCompare: any = {};
    this.hourTime.errorCalendar = false;
    this.hourTime.errorSave = false;
    typeof(this.f.date_start.value) === "string" && (this.f.date_start.setValue(new Date(this.f.date_start.value)));
    typeof(this.f.hour_start.value) === "string" && (this.f.hour_start.setValue(new Date(this.f.hour_start.value)));
    typeof(this.f.date_end.value) === "string" && (this.f.date_end.setValue(new Date(this.f.date_end.value)));
    typeof(this.f.hour_end.value) === "string" && (this.f.hour_end.setValue(new Date(this.f.hour_end.value)));
    
    if (this.f.date_start.value) {
      if (this.hourTime.moment == 'hour_start') {
        const start_year = (this.f.date_start.value).getFullYear();
        const start_month = (this.f.date_start.value).getMonth();
        const start_day = (this.f.date_start.value).getDate();
        infoCompare.hour_start = new Date(start_year, start_month, start_day, this.hourTime.hour, this.hourTime.minute, 0);
      } else {
        if (this.f.hour_start.value) {
          const start_year = (this.f.date_start.value).getFullYear();
          const start_month = (this.f.date_start.value).getMonth();
          const start_day = (this.f.date_start.value).getDate();
          const end_hour = (this.f.hour_start.value).getHours();
          const end_minute = (this.f.hour_start.value).getMinutes();
          infoCompare.hour_start = new Date(start_year, start_month, start_day, end_hour, end_minute, 0);
        }
      }
    }

    if (this.f.date_end.value) {
      if (this.hourTime.moment == 'hour_end') {
        const start_year = (this.f.date_end.value).getFullYear();
        const start_month = (this.f.date_end.value).getMonth();
        const start_day = (this.f.date_end.value).getDate();
        infoCompare.hour_end = new Date(start_year, start_month, start_day, this.hourTime.hour, this.hourTime.minute, 0);
      } else {
        if (this.f.hour_end.value) {
          const start_year = (this.f.date_end.value).getFullYear();
          const start_month = (this.f.date_end.value).getMonth();
          const start_day = (this.f.date_end.value).getDate();
          const end_hour = (this.f.hour_end.value).getHours();
          const end_minute = (this.f.hour_end.value).getMinutes();
          infoCompare.hour_end = new Date(start_year, start_month, start_day, end_hour, end_minute, 0);
        }
      }
    }

    if (infoCompare.hour_start && infoCompare.hour_end) {
      if ((infoCompare.hour_end).getTime() <= (infoCompare.hour_start).getTime()) {
        this.hourTime.errorSave = true;
        this.hourTime.meesageError = 'La fecha y hora de inicio debe ser menor a la fecha y hora de fin.';
      }
    }


  }

  validTimer(field, value) {
    let maxvalue = 0;
    switch (field) {
      case 'hour': {
        maxvalue = 23;
        break;
      }
      case 'minute': {
        maxvalue = 59;
        break;
      }
    }
    if (value > maxvalue) {
      this.hourTime[field] = maxvalue;
    }
    if (value < 0) {
      this.hourTime[field] = 0;
    }
  }

  updateValidity() {
    this.dateRangeForm.get("date_start").setValidators(Validators.required);
    this.dateRangeForm.get("date_start").updateValueAndValidity();
  }
}
