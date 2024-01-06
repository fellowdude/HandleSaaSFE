import { brandRoutes } from "./brand.module";
import { BrandComponent } from './brand.component';
import { CrudBrandComponent } from './crud-brand/crud-brand.component';


describe('ExperienceComponentRoutes', () => {
    it('Deberia existir la ruta por default',() => {
        expect(brandRoutes).toContain({ path: '', component: BrandComponent });
    });

    it('Deberia contener la ruta //new y redireccionar al componente CrudBrandComponent', () => {
        expect(brandRoutes).toContain({ path: 'new', component: CrudBrandComponent });
    });

    it('Deberia contener la ruta //detail/:id y redireccionar al component CrudBrandComponent', () => {
        expect(brandRoutes).toContain({ path: 'detail/:id', component: CrudBrandComponent });
    });
});
