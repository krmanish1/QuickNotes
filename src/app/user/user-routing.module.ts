import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { StickeyNoteComponent } from './stickey-note/stickey-note.component';
import { NotesComponent } from './notes/notes.component';
import { HandwrittenNotesComponent } from './handwritten-notes/handwritten-notes.component';
import { DrawingComponent } from './drawing/drawing.component';
import { CanvasComponent } from './drawing/canvas/canvas.component';
import { JournalComponent } from './journal/journal.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'dashboard',
        component: UserDashboardComponent,

      },
      {
        path: 'stickeynote',
        component: StickeyNoteComponent
      },
      {
        path: 'journal',
        component: JournalComponent
      },
      {
        path: 'handwritten-note',
        component: HandwrittenNotesComponent
      },
      {
        path: 'drawing',
        component: DrawingComponent
      },
      {
        path: 'drawing/canvas',
        component: CanvasComponent
      },
    ]
  },
  // {
  //   path: 'register-login',
  //   loadChildren: () => import('../register-login/register-login.module').then(m => m.RegisterLoginModule)
  // },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
