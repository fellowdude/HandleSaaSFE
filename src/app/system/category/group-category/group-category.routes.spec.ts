import { groupCategoryRoutes } from './group-category.module';
import { CrudGroupCategoryComponent } from './crud-group-category/crud-group-category.component';
import { GroupCategoryComponent } from './group-category.component';

describe('UserProductRoutes',()=>{
    it('Debería existir la ruta por default',()=>{
        expect(groupCategoryRoutes).toContain({ path: '', component: GroupCategoryComponent });
    })

    it('Debería contener la ruta //new y redireccionar al componente CrudGroupCategoryComponent',()=>{
        expect(groupCategoryRoutes).toContain({ path: 'new', component: CrudGroupCategoryComponent });
    })

    it('Debería contener la ruta /detail/:idGroup y redireccionar al componente CrudGroupCategoryComponent', ()=>{
        expect(groupCategoryRoutes).toContain({ path: 'detail/:idGroup', component: CrudGroupCategoryComponent })
    })
})