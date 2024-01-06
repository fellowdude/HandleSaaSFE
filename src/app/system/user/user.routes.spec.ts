import {userRoutes} from './user.module';
import {CrudUserComponent} from './crud-user/crud-user.component';
import {UserComponent} from './user.component';

describe('UserComponentRoutes',()=>{
    it('Debería existir la ruta por default',()=>{
        expect(userRoutes).toContain({ path: '', component: UserComponent });
    })

    it('Debería contener la ruta //new y redireccionar al componente CrudUserComponent',()=>{
        expect(userRoutes).toContain({ path: 'new', component: CrudUserComponent});
    })

    it('Debería contener la ruta //detail/:id y redireccionar al componente CrudUserComponent', ()=>{
        expect(userRoutes).toContain({ path: 'detail/:id', component: CrudUserComponent })
    })
})