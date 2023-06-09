import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorInfoDialogComponent } from './factor-info-dialog.component';

describe('FactorInfoDialogComponent', () => {
  let component: FactorInfoDialogComponent;
  let fixture: ComponentFixture<FactorInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactorInfoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactorInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
