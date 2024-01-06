import { DragDropModule } from "@angular/cdk/drag-drop";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTabsModule,
} from "@angular/material";
import { RouterModule, Routes } from "@angular/router";
import { ComponentsModule } from "../components/components.module";
import { RulesAdminModule } from "./../rules-admin/rules-admin.module";
import { CampaignComponent } from "./campaign.component";
import { CrudCampaignComponent } from "./crud-campaign/crud-campaign.component";
import { ListCampaignComponent } from "./list-campaign/list-campaign.component";

const campaignRoutes: Routes = [
  { path: "", component: CampaignComponent },
  { path: "new", component: CrudCampaignComponent },
  { path: "detail/:idCampaign", component: CrudCampaignComponent },
];

@NgModule({
  declarations: [
    CampaignComponent,
    CrudCampaignComponent,
    ListCampaignComponent,
  ],
  imports: [
    RulesAdminModule,
    RouterModule.forChild(campaignRoutes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatTabsModule,
    ScrollingModule,
    MatSlideToggleModule,
    DragDropModule,
  ],
  exports: [RouterModule],
})
export class CampaignModule {}
