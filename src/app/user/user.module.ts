import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { StickeyNoteComponent } from './stickey-note/stickey-note.component';
import { NotesComponent } from './notes/notes.component';
import { HandwrittenNotesComponent } from './handwritten-notes/handwritten-notes.component';
import { DrawingComponent } from './drawing/drawing.component';
import { LeftMenuComponent } from '../shared/layouts/left-menu/left-menu.component';
import { TopBarComponent } from '../shared/layouts/top-bar/top-bar.component';
import { RightBarComponent } from '../shared/layouts/right-bar/right-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../cors/service/api.service';
import { CustomDatePipe } from '../cors/pipe/custom-date.pipe';
import { DrawingModule } from './drawing/drawing.module';



@NgModule({
  declarations: [
    UserDashboardComponent,
    UserComponent,
    StickeyNoteComponent,
    NotesComponent,
    HandwrittenNotesComponent,
    LeftMenuComponent,
    TopBarComponent,
    RightBarComponent,
    CustomDatePipe

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DrawingModule

  ],
  providers: [
    ApiService, // Ensure ApiService is provided here if it's not already
  ],
})
export class UserModule { }
