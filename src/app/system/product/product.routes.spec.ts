import { productRoutes } from './product.module';
import { CreateProductComponent } from './crud-product/create-product.component';
import { ProductComponent } from './product.component';

describe('UserProductRoutes',()=>{
    it('Debería existir la ruta por default',()=>{
        expect(productRoutes).toContain({ path: '', component: ProductComponent });
    })

    it('Debería contener la ruta //new y redireccionar al componente CreateProductComponent',()=>{
        expect(productRoutes).toContain({ path: 'new', component: CreateProductComponent});
    })

    it('Debería contener la ruta //detail/:id y redireccionar al componente CreateProductComponent', ()=>{
        expect(productRoutes).toContain({ path: 'detail/:id', component: CreateProductComponent })
    })
})