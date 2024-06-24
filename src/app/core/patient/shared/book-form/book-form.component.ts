import { Component, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { trigger, transition, style, animate } from '@angular/animations';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { MarketingServiceService } from 'src/app/core/Markting/MarketingService.service';
@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({height:0}),
        animate(500, style({height:'*'}))
      ]),
      transition(':leave', [
        animate(500, style({height:0}))
      ])
    ])
  ]
})
export class BookFormComponent {
  @Input() doctor: any = null;
  public clinics :any= [];
  fees:any;
  appointmentTypes = [];
  times = [];
  public submitted = false;
  public form:FormGroup = this.formbuilder.group({
    clinic:['',Validators.required],
    appointment:['',Validators.required],
    appointmentDay:[`${new Date().toISOString().split('T')[0]}`,Validators.required],
    times :['',Validators.required],
  });
  selectedClinic :any= null;
  selectedAppointment :any= null;
  public isBokking = false;
  public BookedAppointments: any=[];
  ClinicId
  public isBooked=false;

   //**
   // الايام ثابته
   // يوم الححد يساوي 1
   // يوم السبت 7
   // */
   public dayes = [];

   daysOptions: OwlOptions = {
     mouseDrag: true,
     touchDrag: true,
     pullDrag: true,
     dots: false,
     navSpeed: 700,
     navText: ['', ''],
     responsive: {
       0: {
         items: 4
       },
       400: {
         items: 8
       },
       740: {
         items: 8
       },
       940: {
         items: 9
       }
     },
     nav: false
   }
   constructor(private formbuilder:FormBuilder,private service:PatientService,
    private spinner:NgxSpinnerService,
    private router: Router,
    private mktService:  MarketingServiceService,
    private translocoService: TranslocoService) {}
   ngOnInit(): void {
debugger
    this.dayes = this.enumerateDaysBetweenDates(new Date().setDate(new Date().getDate() -1 ) , new Date().setDate(new Date().getDate() + 15))


    this.clinics  = this.doctor['clinicDtos']
    // find clinic by id
    this.selectedClinic = this.clinics.filter(clinic => clinic['active'] == true)[0]

    try {
      this.form.controls['clinic'].setValue(this.selectedClinic['ClinicId'])
      this.ClinicId = this.selectedClinic['ClinicId']
      setTimeout(() => {
        document.getElementById('clinic-'+this.selectedClinic['ClinicId'])?.click()
      }, 500);

    } catch (error) {

    }

    this.appointmentTypes = this.getAppointmentTypes()
    //on form value change
    this.form.valueChanges.subscribe((value)=>{
      console.log('valueChanges');
      debugger;

if(value!=undefined && value!=null)
{
  console.log('value!=null');
console.log(value);
if(this.BookedAppointments!=null && value.times!=null && this.BookedAppointments.length>0)
{
  console.log('this.BookedAppointments!=null');
  console.log(this.BookedAppointments);
       this.isBooked=this.BookedAppointments.indexOf( value.times) > -1
}
}
      if(this.isBooked)
      {
    //  Swal.fire({
    //       title : 'Already Booked',
    //       text : 'you can book again if you want',
    //       icon : 'info',
    //       showConfirmButton : false,
    //       timer : 2000
    //     }).then((result) => {
    //     })
      }
      else
      {
      if(value.clinic && value.appointment && !value.appointmentDay){
        setTimeout(() => {
          const date = this.dayes.find((day:any)=>day.date == new Date().toISOString().split('T')[0])
          this.getClinicSchedualByClinicDayId(date)
        }, 100);
      }
    }
    })

   }
  getAppointmentTypes(){
debugger
// this.service.getMedicalExaminationType().subscribe((res: any) => {
//   this.appointmentTypes = res['Data'];
// });
    return JSON.parse(localStorage.getItem('doctor')|| '{}')['MedicalExamationTypes']
  }
  enumerateDaysBetweenDates(startDate, endDate) {
    var dates:any = [];
    var currDate:any = moment(startDate).startOf('day');
    var lastDate:any = moment(endDate).startOf('day');
    while(currDate.add(1, 'days').diff(lastDate) < 0) {
      var day:any = {
        // id: Number(currDate.clone().format('d')) + 1,
        id: Number(currDate.clone().format('d')) + 1,
        name: currDate.clone().format('dddd'),
        date: currDate.clone().format('YYYY-MM-DD'),
        number: currDate.clone().format('DD'),
        month: currDate.clone().format('MM'),
        year: currDate.clone().format('YYYY'),
        name_ar : currDate.clone().format('dddd') == 'Saturday' ? 'السبت' : currDate.clone().format('dddd') == 'Sunday' ? 'الاحد' : currDate.clone().format('dddd') == 'Monday' ? 'الاثنين' : currDate.clone().format('dddd') == 'Tuesday' ? 'الثلاثاء' : currDate.clone().format('dddd') == 'Wednesday' ? 'الاربعاء' : currDate.clone().format('dddd') == 'Thursday' ? 'الخميس' : currDate.clone().format('dddd') == 'Friday' ? 'الجمعة' : ''
      }
      dates.push(day)
      }
    return dates;
  };


  chooseClinic(event,ClinicId){
    // var ClinicId = event.target.attributes[8].value;
    if(event.target.checked){
      this.selectedClinic = this.clinics.filter(clinic => clinic['ClinicId'] == ClinicId)[0]
    }
  }
  chooseAppointment(event,MedicalExaminationTypeId){

   // var MedicalExaminationTypeId = event.target.attributes[8].value;

   // console.log(MedicalExaminationTypeId)
    if(event.target.checked){
      this.selectedAppointment = this.appointmentTypes.filter(appointment => appointment['Id'] == MedicalExaminationTypeId)[0]
      this.getClinicSchedualByClinicDayId(this.dayes[0])
    }
  }
  get f() {return this.form.controls}
  submit(){

    var EditAppointmentID = localStorage.getItem('EditAppointmentID');

    var isBooked=this.BookedAppointments.indexOf(this.form.value.times) > -1
    if(isBooked)
    {
   Swal.fire({
        title : 'Already Booked',
        text : 'you can book again if you want',
        icon : 'info',
        showConfirmButton : false,
        timer : 2000
      }).then((result) => {
      })
    }
    else
    {
    this.submitted = true;
    if (this.form.invalid) {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      return
    }

   const form = {
      DoctorId: this.doctor['Id'],
      DoctorWorkingDayTimeId: this.selectedDayId,
      // SchedualId
      AppointmentDate: `${this.form.value.appointmentDay}T${this.form.value.times}`,
      Fees: this.fees,
      Comment: '-',
      IsBook: true
   }

      // Swal confirm
    Swal.fire({
      title: this.translocoService.translate('swal.confirmBooking.title'),
      text: this.translocoService.translate('swal.confirmBooking.text'),
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText : this.translocoService.translate('swal.confirmBooking.cancelButtonText'),
      confirmButtonText: this.translocoService.translate('swal.confirmBooking.confirmButtonText')
    }).then((result) => {
      if (result.isConfirmed) {
        debugger
        this.spinner.show()
        if(EditAppointmentID!=null && EditAppointmentID!='' )
        {

       this.service.editPatientappointment(EditAppointmentID,form.DoctorWorkingDayTimeId,form.AppointmentDate).subscribe(res => {
        this.spinner.hide()
        const eventData: any = this.mktService.setEventData(
          'Patient Booking',
          `Signup Third Step`,
          "New Third Step",
        );

        this.mktService.onEventFacebook(eventData);
        const bookingData = {
          doctor : this.doctor,
          clinic : this.selectedClinic,
          appointment : this.selectedAppointment,
          day : this.form.value.appointmentDay,
          time : this.form.value.times
        }
        localStorage.setItem('bookingData',JSON.stringify(bookingData))
        localStorage.setItem('EditAppointmentID','')
        this.router.navigate(['/patient/booking-successfully'])
      })
    }
    else{

        this.service.createPatientappointment(form).subscribe(res => {
          this.spinner.hide()

          const bookingData = {
            doctor : this.doctor,
            clinic : this.selectedClinic,
            appointment : this.selectedAppointment,
            day : this.form.value.appointmentDay,
            time : this.form.value.times
          }
          localStorage.setItem('bookingData',JSON.stringify(bookingData))
          this.router.navigate(['/patient/booking-successfully'])
        })
      }
      }else{
        Swal.fire({
          title : 'booking canceled',
          text : 'you can book again if you want',
          icon : 'info',
          showConfirmButton : false,
          timer : 2000
        }).then((result) => {
          // window.location.reload()
        })
      }
    })
  }
}
  selectedDayId = null;
  setSelectedDayId(day){
  }
  getClinicSchedualByClinicDayId(day){

    this.spinner.show()
    this.form.controls['times'].setValue(null)
    const ClinicId = this.selectedClinic['ClinicId'],
          DayId = day.id,
          MedicalExaminationTypeId = this.selectedAppointment['Id'],
          BookDate = day.date;
    this.service.getSchedualByClinicIdPolyClinic(ClinicId,this.doctor['Id'],DayId,MedicalExaminationTypeId,BookDate).subscribe(res => {
    if(res['Data'].length>0)
    {
      this.BookedAppointments=[];
      var BookedAppointments=res['Data'][0].BookedAppointments;
      BookedAppointments.forEach (a=>{
        var time= a.split(' ')[1];
      this.BookedAppointments.push(time);
      })
    }
      res['Data'].forEach(element => {
        this.fees=element.Fees;
        sessionStorage.setItem  ('Fees',element.Fees);

        if(element.MaxNoOfPatients == null){

          element['times'] = this.timeInterval(element.TimeFrom, element.TimeTo, element.TimeInterval)
          return
        }else{
          element['times'] = this.timeInterval(element.TimeFrom, element.TimeTo, (this.getMinutesCount(element.TimeFrom,element.TimeTo) / element.MaxNoOfPatients ))
          element['times'].pop()
          return
        }
      });
      console.clear()
      console.log(res['Data'])
      this.times = res['Data']
      if(res['Data'].length > 0){
        this.selectedDayId = res['Data'][0]['SchedualId']
      }
      this.spinner.hide()
    })
  }
  // get minutes "20:30" "21:30"
  getMinutesCount(timeFrom,timeTo){
    // get minutes count
    var timeFrom = timeFrom.split(':');
    var timeTo = timeTo.split(':');
    var hoursFrom = parseInt(timeFrom[0]);
    var hoursTo = parseInt(timeTo[0]);
    var minutesFrom = parseInt(timeFrom[1]);
    var minutesTo = parseInt(timeTo[1]);
    var hours = hoursTo - hoursFrom;
    var minutes = 0;
    if (hours > 0) {
        minutes = (hours * 60) - minutesFrom + minutesTo;
    }
    else {
        minutes = minutesTo - minutesFrom;
    }
    return minutes;

  }

  // time interval from two times in string return times array
  timeInterval(startTime,endTime,add = 30){

    var times  :any= [];
    var start :any = moment(startTime, "HH:mm");
    var end = moment(endTime, "HH:mm");
    while (start <= end) {
       var Booked=this.BookedAppointments.indexOf(start.format("HH:mm")) > -1
      times.push({
        time24: start.format("HH:mm"),
        time12: start.format("hh:mm A"),
         IsBooked:Booked
      });
      start.add(add, "minutes");
    }
    return times;
  }
  getLanguage() {
    return this.translocoService.getActiveLang();
  }
}
