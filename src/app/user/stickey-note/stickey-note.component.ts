import { Component, OnInit } from '@angular/core';
// import { ColorSelectionComponent } from '../color-selection/color-selection.component';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { DataService } from '../../cors/service/data.service';
import { ApiService } from '../../cors/service/api.service';
import { DialogboxService } from '../../Dialog-box/services/dialogbox.service';
import { LoaderService } from '../../shared/services/loader.service';




@Component({
  selector: 'app-stickey-note',
  templateUrl: './stickey-note.component.html',
  styleUrl: './stickey-note.component.scss'
})
export class StickeyNoteComponent implements OnInit {
  isColorVisible = false;
  colorSelected: string | null = null;
  notesItem: any[] = [];
  currentlyEditingNoteId: string | null = null;
  currentlyEditingPart: 'title' | 'description' | null = null;

  showInputFields = null;
  isTitleEmpty = false;
  isDescriptionEmpty = false;


  constructor(
    private data_service: DataService,
    private apiService: ApiService,
    private confirmationDialogService: DialogboxService,
    private loaderService: LoaderService
  ) {

  }

  StickyNote!: FormGroup;

  ngOnInit() {
    this.getAllStickyNotes();
    //  this.formControl();
  }




  get stickeyNoteData() {
    return {
      stickyNoteTitle: this.StickyNote.value.stickyNoteTitle,
      noteDescription: this.StickyNote.value.noteDescription,
      color: this.colorSelected
    };
  }

  async createNotes(color: string) {
    this.isColorVisible = false;
    this.colorSelected = color;
    const base_url = environment.BASE_URL + "api/createstickyNotes";
    try {
      this.loaderService.showLoader;
      const response = await this.apiService.postCall(base_url, this.stickeyNoteData).toPromise();

      this.notesItem.unshift(response);
      this.loaderService.hideLoader;
      this.getAllStickyNotes();
    } catch (error: any) {
      console.error("Error:", error);
      this.loaderService.hideLoader;
      this.confirmationDialogService.confirm('Error',
        error.message,
        'Ok',
        'Cancel',
        'lg',
        'error')
        .then(async (confirmed) => {

          console.log('User confirmed:', confirmed)
        }
        )
        .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }


  }

  selectColor() {
    this.isColorVisible = !this.isColorVisible;
  }




  formControl() {
    // this.StickyNote = new FormGroup({
    //   stickyNoteTitle: new FormControl(''),
    //   noteDescription: new FormControl('')
    // });

    this.StickyNote.valueChanges.pipe(
      debounceTime(5000) // Debounce time in milliseconds
    ).subscribe(value => {
      if (this.currentlyEditingNoteId) {
        this.updateNote(this.currentlyEditingNoteId, value);
      }
    });
  }

  editNote(noteId: string) {
    this.currentlyEditingNoteId = noteId;
  }



  saveNote(note: any) {
    const currentTime = new Date();
    const noteToSave = {
      ...note,
      color: this.colorSelected,
      createdAt: currentTime
    };

    // Implement the logic to save `noteToSave` to the database
  }



  async getAllStickyNotes() {

    const base_url = environment.BASE_URL + "api/getAllStickyNote";
    this.loaderService.showLoader;
    try {
      const response = await this.apiService.getCall(base_url).toPromise();
      //   console.log("Response:", response);
      this.notesItem = response;
      this.loaderService.hideLoader;
      this.StickyNote = new FormGroup(this.create_form(response))
      console.log(this.StickyNote);
      this.formControl()

    } catch (error: any) {
      console.error("Error:", error);
      this.loaderService.hideLoader;
      this.confirmationDialogService.confirm('Error',
        error.message,
        'OK',
        'Cancel',
        'lg',
        'error')
        .then(async (confirmed) => {

          console.log('User confirmed:', confirmed)
        }
        )
        .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }
  }


  create_form(filter_keys: any[]) {
    let group: any = {}
    filter_keys.forEach(val => {
      group[val._id + 'name'] = new FormControl(val.title);
      group[val._id + 'desc'] = new FormControl(val.description);
    })
    return group;
  }

  async updateNote(id: string, updatedData: any) {

    this.StickyNote
    let updatedNoteData = {
      stickyNoteTitle: updatedData[id + 'name'],
      noteDescription: updatedData[id + 'desc'],
      // color: this.colorSelected
    }
    console.log("updated value:-", updatedData);
    const base_url = environment.BASE_URL + `api/updateStickyNoteById/${id}`;
    try {
      const response = await this.apiService.putCall(base_url, updatedNoteData).toPromise();
      console.log("Update Response:", response);
      // Optionally, refresh the list of notes or update the UI to reflect the changes
      this.getAllStickyNotes();
    } catch (error: any) {
      console.error("Error updating note:", error);
      this.confirmationDialogService.confirm('Error',
        error.message,
        'Ok',
        'Cancel',
        'lg',
        'error')
        .then(async (confirmed) => {

          console.log('User confirmed:', confirmed)
        }
        )
        .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }
  }

  deleteStickyNote(id: string) {

    const base_url = environment.BASE_URL + `api/deletestickyNotes/${id}`;

    this.confirmationDialogService.confirm('Delete',
      'Are you sure want to delete the Notes?',
      'Delete',
      'Cancel',
      'lg',
      'delete')
      .then(async (confirmed) => {
        if (confirmed) {
          try {
            this.loaderService.showLoader;
            const response = await this.apiService.deleteCall(base_url).toPromise();
            this.loaderService.hideLoader;
            console.log("Update Response:", response);
            this.notesItem = this.notesItem.filter(note => note._id !== id);
            // Optionally, refresh the list of notes or update the UI to reflect the changes
            this.getAllStickyNotes();
          } catch (error: any) {
            console.error("Error deleting note:", error);
            this.loaderService.hideLoader;
            this.confirmationDialogService.confirm('Error',
              error.message,
              'Ok',
              'Cancel',
              'lg',
              'error')
              .then(async (confirmed) => {

                console.log('User confirmed:', confirmed)
              }
              )
              .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
          }
        }
        console.log('User confirmed:', confirmed)
      }
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

  }


  // startEditing(note) {
  //   note.isEditing = true;
  // }

  // stopEditing(note) {
  //   note.isEditing = false;
  // }


}
