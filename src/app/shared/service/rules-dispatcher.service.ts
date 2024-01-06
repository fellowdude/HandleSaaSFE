import { Subject, BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class RulesDispatcherService {
  discountRulesChanged = new Subject<any>();
  discountRuleSent = new BehaviorSubject({});
  rulesAdminChanged = new BehaviorSubject({});
  unmountDiscountRule = new Subject<boolean>();
  private discountRules: any[] = [];
  private id = 0;
  private rulesAdmin: any;

  addDiscountRule(rdd: any) {
    if (rdd._id === undefined) {
      rdd._id = this.id;
      this.id++;
    }
    this.discountRules.push(rdd);
    this.discountRulesChanged.next(this.discountRules.slice());
  }

  getDiscountRules() {
    return this.discountRules.slice();
  }

  getRulesAdmin() {
    return { ...this.rulesAdmin };
  }

  setRulesAdminChanged(rulesAdmin: any) {
    this.rulesAdmin = rulesAdmin;
    this.rulesAdminChanged.next({ ...this.rulesAdmin });
  }

  deleteDiscountRule(index: number) {
    this.discountRules.splice(index, 1);
    this.discountRulesChanged.next(this.discountRules.slice());
  }

  deleteAllDiscountRules() {
    this.discountRules = [];
    this.discountRulesChanged.next(this.discountRules.slice());
  }

  deleteRulesAdmin() {
    this.id = 0;
    this.rulesAdmin = {};
    this.discountRules = [];
    this.rulesAdminChanged.next({ ...this.rulesAdmin });
  }

  updateDiscountRule(id: string, newDiscountRule: any) {
    const index = this.discountRules.findIndex(rdd => rdd._id === id);
    this.discountRules[index] = Object.assign(
      this.discountRules[index],
      newDiscountRule
    );
    this.discountRulesChanged.next(this.discountRules.slice());
  }

  sendRuleToUpdate(newDiscountRule: any) {
    this.discountRuleSent.next(newDiscountRule);
  }

  onUnmountDiscountRule() {
    this.unmountDiscountRule.next(false);
  }
}
