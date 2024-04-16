import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickeyNoteComponent } from './stickey-note.component';

describe('StickeyNoteComponent', () => {
  let component: StickeyNoteComponent;
  let fixture: ComponentFixture<StickeyNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StickeyNoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StickeyNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
