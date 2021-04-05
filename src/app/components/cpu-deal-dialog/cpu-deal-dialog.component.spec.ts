import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuDealDialogComponent } from './cpu-deal-dialog.component';

describe('CpuDealDialogComponent', () => {
  let component: CpuDealDialogComponent;
  let fixture: ComponentFixture<CpuDealDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpuDealDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpuDealDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
