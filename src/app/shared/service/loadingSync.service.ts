import { Subject, BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class LoadingSync {
    private numberOfFunctions: number = 0;
    loadingFinished = new Subject<number>();

    setNumberOfFunctionsToSync(num: number) {
        this.numberOfFunctions = num;
    }

    finishFunctionLoading() {
        this.numberOfFunctions -= 1;
        this.loadingFinished.next(this.numberOfFunctions);
    }
}