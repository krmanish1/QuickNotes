import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDrawingComponent } from './main-drawing.component';

describe('MainDrawingComponent', () => {
  let component: MainDrawingComponent;
  let fixture: ComponentFixture<MainDrawingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainDrawingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
