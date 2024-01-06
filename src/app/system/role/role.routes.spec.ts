import { roleRoutes } from './role.module'
import { RoleComponent } from './role.component';
import { CrudRoleComponent } from './crud-role/crud-role.component';

describe('UserRoleRoutes',()=>{
    it('Debería existir la ruta por default',()=>{
        expect(roleRoutes).toContain({ path: '', component: RoleComponent });
    })

    it('Debería contener la ruta //new y redireccionar al componente CrudRoleComponent',()=>{
        expect(roleRoutes).toContain({ path: 'new', component: CrudRoleComponent});
    })

    it('Debería contener la ruta //detail/:id y redireccionar al componente CrudRoleComponent', ()=>{
        expect(roleRoutes).toContain({ path: 'detail/:id', component: CrudRoleComponent })
    })
})