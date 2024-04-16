import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandwrittenNotesComponent } from './handwritten-notes.component';

describe('HandwrittenNotesComponent', () => {
  let component: HandwrittenNotesComponent;
  let fixture: ComponentFixture<HandwrittenNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HandwrittenNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HandwrittenNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
