import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposeDealDialogComponent } from './propose-deal-dialog.component';

describe('ProposeDealDialogComponent', () => {
  let component: ProposeDealDialogComponent;
  let fixture: ComponentFixture<ProposeDealDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposeDealDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposeDealDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
