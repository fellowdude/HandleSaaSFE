import { experienceRoutes } from "./experience.module";
import { ExperienceComponent } from './experience.component';
import { CrudExperienceComponent } from './crud-experience/crud-experience.component';


describe('ExperienceComponentRoutes', () => {
    it('Deberia existir la ruta por default',() => {
        expect(experienceRoutes).toContain({ path: '', component: ExperienceComponent });
    });

    it('Deberia contener la ruta //new y redireccionar al componente CrudExperienceComponent', () => {
        expect(experienceRoutes).toContain({ path: 'new', component: CrudExperienceComponent });
    });

    it('Deberia contener la ruta //detail/:id y redireccionar al component CrudExperienceComponent', () => {
        expect(experienceRoutes).toContain({ path: 'detail/:idExperience', component: CrudExperienceComponent });
    });
});
