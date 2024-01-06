import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardComponent } from "./card/card.component";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
} from "@angular/material";
import { MassiveCardsComponent } from './card/massive-cards/massive-cards.component';
import { ScrollingModule } from "@angular/cdk/scrolling";

export const luxuryRoutes: Routes = [{ path: "card", component: CardComponent }];

@NgModule({
  declarations: [CardComponent, MassiveCardsComponent],
  imports: [
    RouterModule.forChild(luxuryRoutes),
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ComponentsModule,
    SharedModule,
    CommonModule,
    ScrollingModule,
    MatSelectModule
  ]
})
export class LuxuryModule {}
