import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsuccessfullyofferComponent } from './bookingsuccessfullyoffer.component';

describe('BookingsuccessfullyofferComponent', () => {
  let component: BookingsuccessfullyofferComponent;
  let fixture: ComponentFixture<BookingsuccessfullyofferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingsuccessfullyofferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingsuccessfullyofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
