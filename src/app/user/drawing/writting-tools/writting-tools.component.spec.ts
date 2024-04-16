import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrittingToolsComponent } from './writting-tools.component';

describe('WrittingToolsComponent', () => {
  let component: WrittingToolsComponent;
  let fixture: ComponentFixture<WrittingToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WrittingToolsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WrittingToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
