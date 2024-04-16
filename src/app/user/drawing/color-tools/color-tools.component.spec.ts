import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorToolsComponent } from './color-tools.component';

describe('ColorToolsComponent', () => {
  let component: ColorToolsComponent;
  let fixture: ComponentFixture<ColorToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColorToolsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
