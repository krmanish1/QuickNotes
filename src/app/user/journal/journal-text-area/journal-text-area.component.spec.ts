import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalTextAreaComponent } from './journal-text-area.component';

describe('JournalTextAreaComponent', () => {
  let component: JournalTextAreaComponent;
  let fixture: ComponentFixture<JournalTextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JournalTextAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JournalTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
