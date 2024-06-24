import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoteForDoctorComponent } from './add-note-for-doctor.component';

describe('AddNoteForDoctorComponent', () => {
  let component: AddNoteForDoctorComponent;
  let fixture: ComponentFixture<AddNoteForDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNoteForDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNoteForDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
