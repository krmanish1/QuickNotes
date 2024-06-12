import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubLeftMenuComponent } from './sub-left-menu.component';

describe('SubLeftMenuComponent', () => {
  let component: SubLeftMenuComponent;
  let fixture: ComponentFixture<SubLeftMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubLeftMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
