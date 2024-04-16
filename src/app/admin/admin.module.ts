import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { StickeyNoteComponent } from './stickey-note/stickey-note.component';
import { NotesComponent } from './notes/notes.component';
import { HandwrittenNotesComponent } from './handwritten-notes/handwritten-notes.component';
import { DrawingComponent } from './drawing/drawing.component';



@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    StickeyNoteComponent,
    NotesComponent,
    HandwrittenNotesComponent,
    DrawingComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
