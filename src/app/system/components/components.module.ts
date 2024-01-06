import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DateRangeComponent } from "./date-range/date-range.component";
import { DialogAddSectionComponent } from "./dialog-add-section/dialog-add-section.component";
import { DialogConfirmComponent } from "./dialog-confirm/dialog-confirm.component";
import { DynamicTreeViewComponent } from "./dynamic-tree-view/dynamic-tree-view.component";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { GridComponent } from "./grid/grid.component";
import { HeaderComponent } from "./header/header.component";
import { ListInformationComponent } from "./list-information/list-information.component";
import { ListPropertyComponent } from "./list-property/list-property.component";
import { MapsLocationComponent } from "./maps-location/maps-location.component";
import { MenuComponent } from "./menu/menu.component";
import { MultimediaGalleryComponent } from "./multimedia-gallery/multimedia-gallery.component";
import { DynamicTreeItemComponent } from "./dynamic-tree-view/dynamic-tree-item/dynamic-tree-item.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgKnifeModule } from "ng-knife";
import {
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatCheckboxModule,
  MatIconModule,
  MatCardModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatSelectModule,
  MatMenuModule,
  MatSnackBarModule,
  MatBadgeModule,
  MatAutocompleteModule
} from "@angular/material";
import { FileUploadModule } from "ng2-file-upload";
import { AgmCoreModule } from "@agm/core";
import { SharedModule } from "src/app/shared/shared.module";
import { CompareImageComponent } from "./compare-image/compare-image.component";
import { CompareVideoComponent } from "./compare-video/compare-video.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SearchLoaderComponent } from "./search-loader/search-loader.component";
import { DialogReasonComponent } from "./dialog-reason/dialog-reason.component";
import { UploadExcelComponent } from './upload-excel/upload-excel.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DialogOrderReasonDetailComponent } from './dialog-order-reason-detail/dialog-order-reason-detail.component';
import { UploaderComponent } from './uploader/uploader.component';
import { OptionImageMenuComponent } from './option-image-menu/option-image-menu.component';
import { NewMenuComponent } from './new-menu/new-menu.component';
import { UploaderVerificationComponent } from "./uploader-verification/uploader-verification.component";
import { BellNotificationsComponent } from './bell-notifications/bell-notifications.component';
import { MapsLeafletComponent } from './maps-leaflet/maps-leaflet.component';

@NgModule({
  declarations: [
    DateRangeComponent,
    DialogAddSectionComponent,
    DialogConfirmComponent,
    DialogOrderReasonDetailComponent,
    DialogReasonComponent,
    DynamicTreeViewComponent,
    DynamicTreeItemComponent,
    FileUploadComponent,
    GridComponent,
    HeaderComponent,
    ListInformationComponent,
    ListPropertyComponent,
    MapsLocationComponent,
    MenuComponent,
    MultimediaGalleryComponent,
    CompareImageComponent,
    CompareVideoComponent,
    SearchLoaderComponent,
    UploadExcelComponent,
    UploaderComponent,
    OptionImageMenuComponent,
    DropdownComponent,
    NewMenuComponent,
    UploaderVerificationComponent,
    BellNotificationsComponent,
    MapsLeafletComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatCheckboxModule,
    FileUploadModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatTooltipModule,
    MatBadgeModule,
    NgKnifeModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCWVDb68VoQGWYszE74Hu35yu2nu1wOBh8",
      libraries: ["places"]
    })
  ],
  exports: [
    DateRangeComponent,
    DialogAddSectionComponent,
    DialogConfirmComponent,
    DialogReasonComponent,
    DialogOrderReasonDetailComponent,
    DynamicTreeViewComponent,
    DynamicTreeItemComponent,
    FileUploadComponent,
    GridComponent,
    HeaderComponent,
    ListInformationComponent,
    ListPropertyComponent,
    MapsLocationComponent,
    MenuComponent,
    NewMenuComponent,
    MultimediaGalleryComponent,
    CompareImageComponent,
    CompareVideoComponent,
    SearchLoaderComponent,
    UploadExcelComponent,
    UploaderComponent,
    OptionImageMenuComponent,
    DropdownComponent,
    MatSnackBarModule,
    UploaderVerificationComponent,
    MapsLeafletComponent
  ]
})
export class ComponentsModule { }
