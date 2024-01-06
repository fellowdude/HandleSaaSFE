import { LoadingComponent } from './loading.component';
import { MiddleService } from '../service/middle.service';
import { from } from 'rxjs'

xdescribe('LoadingComponentUnit', () => {
    let component: LoadingComponent;
    let service: MiddleService;

    beforeEach(() => {
        service = new MiddleService();
        component = new LoadingComponent(new MiddleService());
    });

    it("ShowLoading debería empezar en false",() => {
        expect(component.showLoading).toBeFalsy();
    })
})