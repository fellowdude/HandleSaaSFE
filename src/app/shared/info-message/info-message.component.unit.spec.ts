import { InfoMessageComponent } from './info-message.component';
import { MiddleService } from '../service/middle.service';
import { Subscription, Observable } from 'rxjs';
import 'rxjs/add/observable/from';

xdescribe('InfoMessageComponentUnitTest',() => {

    let component: InfoMessageComponent;
    let service: MiddleService;
    let subcripcion: Subscription;

    beforeEach(() => {
        service = new MiddleService();
        component = new InfoMessageComponent(new MiddleService());
        subcripcion = new Subscription();
    })

    it("El mensaje siempre debería comenzar en false", () => {
        expect(component.showMessage).toBeFalsy();
    })
})