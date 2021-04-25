import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyCardDialogComponent } from './property-card-dialog.component';

describe('PropertyCardDialogComponent', () => {
  let component: PropertyCardDialogComponent;
  let fixture: ComponentFixture<PropertyCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyCardDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
