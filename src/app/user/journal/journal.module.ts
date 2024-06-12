import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalComponent } from './journal.component';
import { JournalTextAreaComponent } from './journal-text-area/journal-text-area.component';
import { SubLeftMenuComponent } from '../../shared/sub-left-menu/sub-left-menu.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
    JournalComponent,
    JournalTextAreaComponent,
    SubLeftMenuComponent
  ],
  imports: [
    CommonModule,
    CKEditorModule
  ]
})
export class JournalModule { }
