import { MiddleService } from "./../../../shared/service/middle.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-dialog-reason",
  templateUrl: "./dialog-reason.component.html",
  styleUrls: ["./dialog-reason.component.scss"]
})
export class DialogReasonComponent implements OnInit {
  showModal: boolean;
  private title: string;
  reasonForm: FormGroup;
  showPriceReason: boolean;
  showSpecialPriceReason: boolean;
  showCampaignPriceReason: boolean;
  submitted: boolean;
  @Output() answerModal = new EventEmitter<any>();
  constructor(private _middleService: MiddleService) {}

  ngOnInit() {
    this.reasonForm = new FormGroup({
      priceReason: new FormControl(null, [Validators.required]),
      specialPriceReason: new FormControl(null, [Validators.required]),
      campaignPriceReason: new FormControl(null, [Validators.required])
    });
    this.submitted = false;
  }

  get f() {
    return this.reasonForm.controls;
  }

  show(
    title: string,
    showPriceReason?: boolean,
    showSpecialPriceReason?: boolean,
    showCampaignPriceReason?: boolean
  ) {
    this.showModal = true;
    this.title = title;
    this.showPriceReason = showPriceReason;
    this.showSpecialPriceReason = showSpecialPriceReason;
    this.showCampaignPriceReason = showCampaignPriceReason;
  }

  accept() {
    this.submitted = true;

    if (!this.showPriceReason) {
      this.reasonForm.get("priceReason").clearValidators();
      this.reasonForm.get("priceReason").updateValueAndValidity();
    }

    if (!this.showSpecialPriceReason) {
      this.reasonForm.get("specialPriceReason").clearValidators();
      this.reasonForm.get("specialPriceReason").updateValueAndValidity();
    }

    if (!this.showCampaignPriceReason) {
      this.reasonForm.get("campaignPriceReason").clearValidators();
      this.reasonForm.get("campaignPriceReason").updateValueAndValidity();
    }

    let reason = {};

    this.showPriceReason &&
      (reason = {
        ...reason,
        priceReason: this.reasonForm.get("priceReason").value
      });
    this.showSpecialPriceReason &&
      (reason = {
        ...reason,
        specialPriceReason: this.reasonForm.get("specialPriceReason").value
      });
    this.showCampaignPriceReason &&
      (reason = {
        ...reason,
        campaignReason: this.reasonForm.get("campaignPriceReason").value
      });

    if (!this.reasonForm.invalid) {
      this.answerModal.emit(reason);
      this.reasonForm.reset();
      this.showModal = false;
    } else {
      this._middleService.sendMessage(
        "Campaña",
        "Debe de completar los campos requeridos",
        "error"
      );
    }
  }

  close() {
    this.showModal = false;
  }
}
