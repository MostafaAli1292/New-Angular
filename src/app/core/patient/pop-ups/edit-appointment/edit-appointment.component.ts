import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: [
    './edit-appointment.component.scss',
    // ./doctor-profile.component.scss
    '../../components/doctor-profile/doctor-profile.component.scss',
  ]
})
export class EditAppointmentComponent {
  doctor
  constructor(
    public dialogRef: MatDialogRef<EditAppointmentComponent> ,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.doctor = data.doctor
    console.log(data.doctor)
  }
  // appointmentTypes = ["Clinic Booking","Home Visit","Chat","Call","Video Call"];
  // clinics = ["Clinic 1","Clinic 2","Clinic 3","Clinic 4","Clinic 5","Clinic 6","Clinic 7","Clinic 8"];
  // dayes = [
  //   {name: "Sunday", numberOfMonth: 2},
  //   {name: "Monday", numberOfMonth: 3},
  //   {name: "Tuesday", numberOfMonth: 4},
  //   {name: "Wednesday", numberOfMonth: 5},
  //   {name: "Thursday", numberOfMonth: 6},
  //   {name: "Friday", numberOfMonth: 7},
  //   {name: "Saturday", numberOfMonth: 8},
  //   {name: "Sunday", numberOfMonth: 22},
  //   {name: "Thursday", numberOfMonth: 15},
  //   {name: "Friday", numberOfMonth: 17},
  //   {name: "Saturday", numberOfMonth: 18},
  //   {name: "Sunday", numberOfMonth: 22},
  //   {name: "Monday", numberOfMonth: 23},
  //   {name: "Tuesday", numberOfMonth: 24},
  //   {name: "Wednesday", numberOfMonth: 25},
  // ];
  // daysOptions: OwlOptions = {
  //   mouseDrag: true,
  //   touchDrag: true,
  //   pullDrag: true,
  //   dots: false,
  //   navSpeed: 700,
  //   navText: ['', ''],
  //   responsive: {
  //     0: {
  //       items: 4
  //     },
  //     400: {
  //       items: 8
  //     },
  //     740: {
  //       items: 8
  //     },
  //     940: {
  //       items: 9
  //     }
  //   },
  //   nav: false
  // }
  // times = [
  //   "09:00 AM",
  //   "09:30 AM",
  //   "10:00 AM",
  //   "10:30 AM",
  //   "11:00 AM",
  //   "11:30 AM",
  //   "12:00 PM",
  //   "12:30 PM",
  //   "01:00 PM",
  //   "01:30 PM",
  //   "02:00 PM",
  //   "02:30 PM",
  //   "03:00 PM",
  //   "03:30 PM",
  //   "04:00 PM",
  // ]
}
