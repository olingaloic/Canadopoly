import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanceDialogComponent } from './chance-dialog.component';

describe('ChanceDialogComponent', () => {
  let component: ChanceDialogComponent;
  let fixture: ComponentFixture<ChanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChanceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
