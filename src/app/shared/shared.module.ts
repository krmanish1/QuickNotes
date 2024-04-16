import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftMenuComponent } from './layouts/left-menu/left-menu.component';
import { RightBarComponent } from './layouts/right-bar/right-bar.component';
import { TopBarComponent } from './layouts/top-bar/top-bar.component';
import { PageNotFoundComponent } from './layouts/page-not-found/page-not-found.component';
import { ColorSelectionComponent } from './color-selection/color-selection.component';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    ColorSelectionComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PageNotFoundComponent,
  ]
})
export class SharedModule { }
