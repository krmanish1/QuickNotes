import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { StickeyNoteComponent } from './stickey-note/stickey-note.component';
import { NotesComponent } from './notes/notes.component';
import { HandwrittenNotesComponent } from './handwritten-notes/handwritten-notes.component';
import { DrawingComponent } from './drawing/drawing.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'stickeynote',
        component: StickeyNoteComponent
      },
      {
        path: 'note',
        component: NotesComponent
      },
      {
        path: 'handwritten-note',
        component: HandwrittenNotesComponent
      },
      {
        path: 'drawing',
        component: DrawingComponent
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
export class AdminRoutingModule { }
