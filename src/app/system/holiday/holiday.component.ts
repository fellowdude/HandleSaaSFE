import { Component, HostListener, OnInit } from '@angular/core';
import { HolidayService } from 'src/app/shared/service/holiday.service';
import { MiddleService } from 'src/app/shared/service/middle.service';
import { HeaderService } from '../components/header/header.service';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit {
  listCalendar: any;
  calendarSelect: any;
  showModalHoliday: any;
  headerFixed = false;
  constructor(
    private serviceHoliday: HolidayService,
    private middleService: MiddleService,
    private headerService: HeaderService
  ) {
    this.calendarSelect = {};
  }

  ngOnInit() {
    this.headerService.sendTitle('Feriados');
    this.calendarSelect.month = new Date().getMonth() + 1;
    this.calendarSelect.year = new Date().getFullYear();
    this.calendarSelect.letterMonth = this.getMonthLetter();
    this.getCalendar();
  }

  @HostListener('window:scroll', ['$event']) private onWindowScroll($event: Event): void {
    this.scrollEvent($event);
  }
  scrollEvent = (event: any): void => {
    // const number = event.srcElement.scrollTop;
    const number = document.documentElement.scrollTop;
    if (number >= 33) {
      this.headerFixed = true;
    } else {
      this.headerFixed = false;
    }
  }

  closeModalHoliday() {
    this.showModalHoliday = false;
  }

  deleteHoliday() {
    if (this.calendarSelect.id_holiday) {
      this.serviceHoliday.delete(this.calendarSelect.id_holiday).subscribe(
        infoDelete => {
          this.closeModalHoliday();
          this.getCalendar();
          this.middleService.sendMessage(
            'Feriados',
            'El feriado ha sido eliminado correctamente',
            'ok'
          );
        },
        error => {
          this.middleService.sendMessage(
            'Feriados',
            error.error.message,
            'error'
          );
        }
      );
    }
  }

  getCalendar() {
    this.middleService.sendLoading(true);
    this.serviceHoliday
      .getCalendar(this.calendarSelect.month, this.calendarSelect.year)
      .subscribe(
        listCalendar => {
          this.middleService.sendLoading(false);
          this.listCalendar = listCalendar;
        },
        error => {
          this.middleService.sendLoading(false);
          this.middleService.sendMessage(
            'Feriados',
            error.error.message,
            'error'
          );
        }
      );
  }

  getMonthLetter() {
    switch (this.calendarSelect.month) {
      case 1: {
        return 'Enero';
        break;
      }
      case 2: {
        return 'Febrero';
        break;
      }
      case 3: {
        return 'Marzo';
        break;
      }
      case 4: {
        return 'Abril';
        break;
      }
      case 5: {
        return 'Mayo';
        break;
      }
      case 6: {
        return 'Junio';
        break;
      }
      case 7: {
        return 'Julio';
        break;
      }
      case 8: {
        return 'Agosto';
        break;
      }
      case 9: {
        return 'Setiembre';
        break;
      }
      case 10: {
        return 'Octubre';
        break;
      }
      case 11: {
        return 'Noviembre';
        break;
      }
      case 12: {
        return 'Diciembre';
        break;
      }
    }
  }

  openModalHoliday(objDay) {
    if (objDay.day) {
      this.calendarSelect.daySelect = objDay.day;
      this.calendarSelect.reason = objDay.reason;
      this.calendarSelect.id_holiday = objDay.id_holiday;
      this.showModalHoliday = true;
    }
  }

  previousMonth() {
    const newCalendar = new Date(
      this.calendarSelect.year,
      this.calendarSelect.month - 2
    );
    this.updateInfoCalendar(newCalendar);
  }
  nextMonth() {
    const newCalendar = new Date(
      this.calendarSelect.year,
      this.calendarSelect.month
    );
    this.updateInfoCalendar(newCalendar);
  }

  updateInfoCalendar(date) {
    this.calendarSelect.month = date.getMonth() + 1;
    this.calendarSelect.year = date.getFullYear();
    this.calendarSelect.letterMonth = this.getMonthLetter();
    this.getCalendar();
  }

  saveHoliday() {
    const monthSave =
      this.calendarSelect.month > 9
        ? this.calendarSelect.month
        : '0' + this.calendarSelect.month;
    const daySave =
      this.calendarSelect.daySelect > 9
        ? this.calendarSelect.daySelect
        : '0' + this.calendarSelect.daySelect;
    this.calendarSelect.day =
      this.calendarSelect.year + '-' + monthSave + '-' + daySave;
    this.middleService.sendLoading(true);
    if (this.calendarSelect.id_holiday) {
      this.serviceHoliday
        .update(this.calendarSelect.id_holiday, this.calendarSelect)
        .subscribe(
          infoUpdate => {
            this.middleService.sendLoading(false);
            this.closeModalHoliday();
            this.getCalendar();
            this.middleService.sendMessage(
              'Feriados',
              'El feriado ha sido actualizado correctamente',
              'ok'
            );
          },
          error => {
            this.middleService.sendLoading(false);
            this.middleService.sendMessage(
              'Feriados',
              error.error.message,
              'error'
            );
          }
        );
    } else {
      this.serviceHoliday.saveProduct(this.calendarSelect).subscribe(
        infoCreate => {
          this.middleService.sendLoading(false);
          this.closeModalHoliday();
          this.getCalendar();
          this.middleService.sendMessage(
            'Feriados',
            'El feriado ha sido creado correctamente',
            'ok'
          );
        },
        error => {
          this.middleService.sendLoading(false);
          this.middleService.sendMessage(
            'Feriados',
            error.error.message,
            'error'
          );
        }
      );
    }
  }
}
