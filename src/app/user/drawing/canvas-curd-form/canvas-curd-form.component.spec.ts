import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasCurdFormComponent } from './canvas-curd-form.component';

describe('CanvasCurdFormComponent', () => {
  let component: CanvasCurdFormComponent;
  let fixture: ComponentFixture<CanvasCurdFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CanvasCurdFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CanvasCurdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
