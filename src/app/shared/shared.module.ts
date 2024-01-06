import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoMessageComponent } from './info-message/info-message.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoadingComponent } from './loading/loading.component';
import { BooleanCheckPipe } from './pipe/boolean-check.pipe';
import { FieldValuePipe } from './pipe/field-value.pipe';
import { SaveVideoPipe } from './pipe/save-video.pipe';
import { SafePipe } from './pipe/safe.pipe';
import { SearchInArrayPipe } from './pipe/search-in-array.pipe';
import { ActiveBannerPipe } from './pipe/active-banner.pipe';
import { ActiveBannerColorPipe } from './pipe/active-banner-color.pipe';
import { LoadingLocalComponent } from './loading-local/loading-local.component';
import { LoadingLocalTableComponent } from './loading-local-table/loading-local-table.component';
import { LoadingCircleGraphComponent } from './loading-circle-graph/loading-circle-graph.component';
import { LoadingBarGraphComponent } from './loading-bar-graph/loading-bar-graph.component';

@NgModule({
  declarations: [
    InfoMessageComponent,
    NotFoundPageComponent,
    LoadingComponent,
    BooleanCheckPipe,
    FieldValuePipe,
    SaveVideoPipe,
    SafePipe,
    SearchInArrayPipe,
    ActiveBannerPipe,
    ActiveBannerColorPipe,
    LoadingLocalComponent,
    LoadingLocalTableComponent,
    LoadingCircleGraphComponent,
    LoadingBarGraphComponent,
  ],
  exports: [
    InfoMessageComponent,
    LoadingComponent,
    BooleanCheckPipe,
    FieldValuePipe,
    SaveVideoPipe,
    SafePipe,
    SearchInArrayPipe,
    ActiveBannerPipe,
    ActiveBannerColorPipe,
    LoadingLocalComponent,
    LoadingLocalTableComponent,
    LoadingCircleGraphComponent,
    LoadingBarGraphComponent
  ],
  providers: [],
  imports: [CommonModule, MatToolbarModule]
})
export class SharedModule { }
