import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteChooserComponent } from './edit-delete-chooser.component';

describe('EditDeleteChooserComponent', () => {
  let component: EditDeleteChooserComponent;
  let fixture: ComponentFixture<EditDeleteChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeleteChooserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDeleteChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
