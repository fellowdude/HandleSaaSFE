import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MAT_DATE_LOCALE } from "@angular/material";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { SystemComponent } from "./system.component";
import { MainComponent } from "./main/main.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { FroalaEditorModule, FroalaViewModule } from "angular-froala-wysiwyg";
import { MatDialogModule } from "@angular/material/dialog";
import { Ng5SliderModule } from "ng5-slider";
import { ComponentsModule } from "./components/components.module";
import { WelcomeComponent } from "./welcome/welcome.component";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OrderDayComponent } from './main/order-day/order-day.component';
import { SessionActiveComponent } from './main/session-active/session-active.component';
import { GrowthComponent } from './main/growth/growth.component';
import { SellTodayComponent } from './main/sell-today/sell-today.component';
import { LastOrderComponent } from './main/last-order/last-order.component';
import { CustomerListComponent } from './main/customer-list/customer-list.component';
import { SellCategoryComponent } from './main/sell-category/sell-category.component';
import { BarGraphicComponent } from './main/bar-graphic/bar-graphic.component';
const systemChildRoutes: Routes = [
  { path: "", component: WelcomeComponent },
  { path: "dashboard", component: MainComponent },

  {
    path: "brand",
    loadChildren: () =>
      import("./brand/brand.module").then((m) => m.BrandModule),
  },
  {
    path: "categories-filters",
    loadChildren: () =>
      import("./categories-filters/categories-filters.module").then(
        (m) => m.CategoriesFiltersModule
      ),
  },
  {
    path: "category",
    loadChildren: () =>
      import("./category/category.module").then((m) => m.CategoryModule),
  },
  {
    path: "categories-groups",
    loadChildren: () =>
      import("./category/group-category/group-category.module").then(
        (m) => m.GroupCategoryModule
      ),
  },
  {
    path: "banner",
    loadChildren: () =>
      import("./cms/banner/banner.module").then((m) => m.BannerModule),
  },
  {
    path: "company-info",
    loadChildren: () =>
      import("./cms/company/company.module").then((m) => m.CompanyModule),
  },
  {
    path: "payment-method",
    loadChildren: () =>
      import("./cms/payment-method/payment-method.module").then(
        (m) => m.PaymentMethodModule
      ),
  },
  {
    path: "contact-email",
    loadChildren: () =>
      import("./contact-email/contact-email.module").then(
        (m) => m.ContactEmailModule
      ),
  },
  {
    path: "email-form",
    loadChildren: () =>
      import("./content/email-form/email-form.module").then(
        (m) => m.EmailFormModule
      ),
  },
  {
    path: "static-page",
    loadChildren: () =>
      import("./content/static-page/static-page.module").then(
        (m) => m.StaticPageModule
      ),
  },
  {
    path: "content-page",
    loadChildren: () =>
      import("./content/content-page/content-page.module").then(
        (m) => m.ContentPageModule
      ),
  },
  {
    path: "customer",
    loadChildren: () =>
      import("./customer/customer.module").then((m) => m.CustomerModule),
  },
  {
    path: "experience",
    loadChildren: () =>
      import("./experience/experience.module").then((m) => m.ExperienceModule),
  },
  {
    path: "flow-request",
    loadChildren: () =>
      import("./flow-request/flow-request.module").then(
        (m) => m.FlowRequestModule
      ),
  },
  {
    path: "group-approval",
    loadChildren: () =>
      import("./group-approval/group-approval.module").then(
        (m) => m.GroupApprovalModule
      ),
  },
  {
    path: "group-email",
    loadChildren: () =>
      import("./group-email/group-email.module").then(
        (m) => m.GroupEmailModule
      ),
  },
  {
    path: "group-customer",
    loadChildren: () =>
      import("./group-customer/group-customer.module").then(
        (m) => m.GroupCustomerModule
      ),
  },
  {
    path: "holiday",
    loadChildren: () =>
      import("./holiday/holiday.module").then((m) => m.HolidayModule),
  },
  {
    path: "list-request",
    loadChildren: () =>
      import("./list-request/list-request.module").then(
        (m) => m.ListRequestModule
      ),
  },
  {
    path: "product",
    loadChildren: () =>
      import("./product/product.module").then((m) => m.ProductModule),
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfileModule),
  },
  {
    path: "role",
    loadChildren: () => import("./role/role.module").then((m) => m.RoleModule),
  },
  {
    path: "supplier",
    loadChildren: () =>
      import("./supplier/supplier.module").then((m) => m.SupplierModule),
  },
  {
    path: "user",
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule),
  },
  {
    path: "campaign",
    loadChildren: () =>
      import("./campaign/campaign.module").then((m) => m.CampaignModule),
  },
  {
    path: "report",
    loadChildren: () =>
      import("./report/report.module").then((m) => m.ReportModule),
  },
  {
    path: "discount-code",
    loadChildren: () =>
      import("./discount-code/discount-code.module").then(
        (m) => m.DiscountCodeModule
      ),
  },
  {
    path: "order",
    loadChildren: () =>
      import("./order/order.module").then((m) => m.OrderModule),
  },
  {
    path: "blog",
    loadChildren: () => import("./blog/blog.module").then((m) => m.BlogModule),
  },
  {
    path: "luxury",
    loadChildren: () =>
      import("./luxury/luxury.module").then((m) => m.LuxuryModule),
  },
  {
    path: "prestigia",
    loadChildren: () =>
      import("./luxury/luxury.module").then((m) => m.LuxuryModule),
  },
  {
    path: "author",
    loadChildren: () =>
      import("./author-blog/author-blog.module").then((m) => m.AuthorBlogModule),
  },
  {
    path: "call-center",
    loadChildren: () =>
      import("./call-center/call-center.module").then((m) => m.CallCenterModule),
  },
  {
    path: "notifications",
    loadChildren: () =>
      import("./notifications/notifications.module").then((m) => m.NotificationsModule),
  }
  // {
  //   path: "discount-rule",
  //   loadChildren: () =>
  //     import("./discount-rule/discount-rule.module").then(
  //       m => m.DiscountRuleModule
  //     )
  // },
  // {
  //   path: "rules-admin",
  //   loadChildren: () =>
  //     import("./rules-admin/rules-admin.module").then(m => m.RulesAdminModule)
  // }
];
const systemRoutes: Routes = [
  { path: "", component: SystemComponent, children: systemChildRoutes },
];
@NgModule({
  declarations: [SystemComponent, MainComponent, WelcomeComponent, OrderDayComponent, SessionActiveComponent, GrowthComponent, SellTodayComponent, LastOrderComponent, CustomerListComponent, SellCategoryComponent, BarGraphicComponent],
  imports: [
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    RouterModule.forChild(systemRoutes),
    ComponentsModule,
    SharedModule,
    CommonModule,
    MatDialogModule,
    DragDropModule,
    Ng5SliderModule,
    NgxChartsModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: "es-ES" }],
  exports: [RouterModule],
})
export class SystemModule { }
