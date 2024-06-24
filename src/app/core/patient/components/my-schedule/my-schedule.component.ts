import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { EditAppointmentComponent } from '../../pop-ups/edit-appointment/edit-appointment.component';
import { PatientService } from 'src/app/services/patient.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ContactUsComponent } from 'src/app/core/authentication/contact-us/contact-us.component';
import { MapboxComponent } from '../../shared/mapbox/mapbox.component';
import { RateComponent } from '../../shared/rate/rate.component';
import { TranslocoService } from '@ngneat/transloco';
import { languages } from 'src/app/data/languages';


@Component({
  selector: 'app-my-schedule',
  templateUrl: './my-schedule.component.html',
  styleUrls: ['./my-schedule.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyScheduleComponent {
  date = null;
  lat:any;
  long;
  data :any ;
  todayDate:any;
  eventType = 0
  storageUrl = environment.storageUrl
  loading = false
  public IsArabic
  public IsEnglish
  address:any
  area:any
  floor:any;
  appartment:any;
  languages = languages;
  selectedLanguage = this.languages[0];
  constructor(
    private dialog: MatDialog,
    private service : PatientService,
    private spinner: NgxSpinnerService,
    private router: Router,private translocoService: TranslocoService
  ) {
    // this.editAppointment()
  }
  ngOnInit(): void {

    debugger

    this.changeEventType({index:0})
    const lang = localStorage.getItem('lang');
    if (lang) {
       if (lang === 'ar') {
       this.IsEnglish=false;
       this.IsArabic=true;
       this.floor="رقم الدور"
       this.appartment="رقم الشقة"
        // window.open('/termsAr')

      }
      else {
        this.IsEnglish=true;
        this.IsArabic=false;
        this.floor="رقم الدور"
        this.appartment="رقم الشقة"



      }
console.log("En"+ this.IsEnglish);
console.log("Ar"+ this.IsArabic);
console.log("locals"+ lang);
 }

  this.area=this.data.CityName+" "+this.data.AreaName;
 this.address = this.data.Address;
 if(this.data.FloorNo != null && this.data.FloorNo!='0'){

   this.address=this.address+" "+  this.floor+" "+this.data.FloorNo;
 }

 if(this.data.ApartmentNo != null && this.data.ApartmentNo!='0'){

   this.address=this.address+" "+this.appartment+" "+this.data.ApartmentNo ;
 }

   }

  changeEventType(e){
    this.eventType = e.index
    this.data = []
    switch (e.index) {
      case 0:
        this.getUpcomingAppointmentes()
        break;
      case 1:
        this.getMedicalHistoryAppointmentes()
        break;
      case 2:
        this.getCanceledAppointmentes()
        break;
      default:
        break;
    }
  }

  getUpcomingAppointmentes(){
    debugger
    this.spinner.show()
    this.loading = true
    this.service.getUpcomingAppointmentes().subscribe(res=>{
      this.data = res['Data']
      this.spinner.hide()
      this.loading = false
      this.data.forEach(e => {
        debugger;
        var s=e;

        if(e.FloorNo != null && e.FloorNo!='0'){

          e.ClinicAddress=e.ClinicAddress+" "+  this.floor+" "+e.FloorNo;
        }

        if(e.ApartmentNo != null && e.ApartmentNo!='0'){

          e.ClinicAddress=e.ClinicAddress+" "+this.appartment+" "+e.ApartmentNo ;
        }
      });

    })
  }
  getMedicalHistoryAppointmentes(){
    this.spinner.show()
    this.loading = true
    this.service.getMedicalHistoryAppointmentes().subscribe(res=>{
      this.data = res['Data']
      this.spinner.hide()
      this.loading = false
    })
  }
  getCanceledAppointmentes(){
    this.spinner.show()
    this.loading = true

    this.service.getCanceledAppointmentes().subscribe(res=>{
      // console.clear()
      console.log(res['Data'])
      this.data = res['Data']
      this.spinner.hide()
      this.loading = false

    })
  }
  // getUpcomingAppointmentes() {
  //   return this.http.get<any>(`${environment.apiUrl}/PatientAppointment/GetUpcomingAppointmentes`)
  // }
  // getMedicalHistoryAppointmentes() {
  //   return this.http.get<any>(`${environment.apiUrl}/PatientAppointment/GetMedicalHistoryAppointmentes`)
  // }
  // getCanceledAppointmentes() {
  //   return this.http.get<any>(`${environment.apiUrl}/PatientAppointment/GetCanceledAppointmentes`)
  // }
  // getPatientAppointmentes(){
  //   this.service.getPatientAppointmentes().subscribe(res=>{
  //     console.clear()
  //     console.log(res)
  //     this.data = res['Data']

  //     // •ف الupcomingلو التاريخ اكبر من الcurrent dateوال isCancelبfalse
  //     var upComing = this.data.filter((item:any)=>{
  //       return new Date(item.AppointmentDate) > new Date() && item.isCancel == false
  //     })
  //     // •الMedical historyده لوIsCompletedبtrue
  //     var medicalHistory = this.data.filter((item:any)=>{
  //       return item.IsCompleted == true
  //     })
  //     //•الCanceledلوIsCancelبTrue
  //     var canceled = this.data.filter((item:any)=>{
  //       return item.isCancel == true
  //     })

  //     console.log(upComing)
  //     console.log(medicalHistory)
  //     console.log(canceled)

  //   })
  // }

  goToMedical(doctor){

  this.router.navigate(['/patient/medical',doctor.AppointmentId])

  }
  RebookAppointment(doctor):void{
    debugger
    this.todayDate = new Date().toISOString().split('T')[0]
     this.router.navigate(['/patient/doctor-profile',doctor['DoctorId']]) ,{ queryParams: {
        DoctorId : doctor.DoctorId,
        ClinicId : doctor.ClinicId,
        AvalibleDate : this.todayDate
       } }
  }
  editAppointment(doctor): void {

    debugger
    /*
    * 	 path => import { Router } from '@angular/router';
    * 	 param => private router: Router
    */
    // this.spinner.show()
    var AppointmentId = doctor['AppointmentId']
    // this.rate(doctor)
    // this.service.cancelAppointment(AppointmentId).subscribe(res=>{
      localStorage.setItem('EditAppointmentID', AppointmentId);

       this.router.navigate(['/patient/doctor-profile',doctor['DoctorId']]) ,{ queryParams: {
        DoctorId : doctor.DoctorId,
        ClinicId : doctor.ClinicId,

       } }
      // this.spinner.hide()
    // })


    // const dialogRef = this.dialog.open(EditAppointmentComponent, {
    //   data: {
    //     doctor : doctor
    //   },
    //   width: '600px',
    //   height: 'auto',
    //   maxHeight: '90vh',

    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
  }
  help(){
    // ContactUsComponent
    this.dialog.open(ContactUsComponent, {
      width: '500px',
      // height: '500px',
      data: {}
    });
  }
  // RateComponent
  rate(doctor){
    const dialogRef = this.dialog.open(RateComponent, {
      width: '500px',
      data: {
        doctor : doctor
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'close'){
        this.changeEventType({index:1})
      }
    })


  }


  map(doctor){
    debugger
    console.log(doctor)
    // ContactUsComponent
if( doctor['ClinicLatitude'] !=null && doctor['ClinicLongitude'])
{
  this.lat=doctor['ClinicLatitude']
  this.long =doctor['ClinicLongitude']
    // this.dialog.open(MapboxComponent, {

    //   data: {
    //     latitude : doctor['ClinicLatitude'],
    //     longitude : doctor['ClinicLongitude'],
    //   }
    // });
    window.open('https://www.google.com/maps/search/?api=1&query='+this.lat+','+this.long)
   }
  else
  {
    Swal.fire({
      icon: 'error',
      title: this.translocoService.translate('swal.confirmBooking.sorry'),
      showConfirmButton: false,
      timer: 2500
    })
    return
    }
    // window.open("https://www.google.com/maps/search/?api=1&query={{doctor.Latitude}},{{doctor.Longitude}}")
  }
  //
  cancelAppointment(AppointmentId:any,DoctorId:any = null){
    Swal.fire({
      title: this.translocoService.translate('swal.confirmBooking.cancelap'),
      html: '<img src="assets/icons/cancel-appointment2.svg">',
      showCancelButton: true,
      cancelButtonColor: '#CB544B',
      cancelButtonText: this.translocoService.translate('swal.confirmBooking.re'),
      confirmButtonText: this.translocoService.translate('swal.confirmBooking.can'),
      customClass: 'cancel-appointment-swal-modal'
    }).then((result) => {
      if (result.value) {
        this.spinner.show()


        this.service.cancelAppointment(AppointmentId).subscribe(res=>{
          this.spinner.hide()
          Swal.fire(
            'Cancelled!',
            'Your appointment has been cancelled.',
            'success'
          ).then(()=>{
            this.changeEventType({index:0})
          })
        })
      }
      // on cancelButtonText click
      else if (result.dismiss === Swal.DismissReason.cancel) {
        this.spinner.show()
        this.service.cancelAppointment(AppointmentId).subscribe(res=>{
          this.spinner.hide()
          // go to doctor profile
          // patient/doctor-profile/26
          /*
          * 	 path => import { Router } from '@angular/router';
          * 	 param =>
          */
          this.router.navigate(['/patient/doctor-profile',DoctorId])

        })
      }
    })
  }

    returnWeekDay(item: any) {

      var dt=item.substring(0,10)
      var tm= item.substring(11)
      var h=tm.split(':')[0]
      var minu=tm.split(':')[1]
      var y=dt.split('-')[0]
      var m= parseInt( dt.split('-')[1])-1
      var d=dt.split('-')[2]
      const lang = localStorage.getItem('lang');
      this.convertTime24to12(tm)
      const date = new Date(y,m,d,h,minu)


      const options:any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour12: true, hour: "numeric", minute: "numeric" };
      if (lang === 'ar')  {
        return new Intl.DateTimeFormat("ar-EG", options).format(date);

      }else{

        return new Intl.DateTimeFormat("en-US", options).format(date);
      }
    }

    convertTime24to12(time24h:any) {
      let [hours, minutes] = time24h.split(':');
      let time12h = new Date(0, 0, 0, parseInt(hours), parseInt(minutes));
      const lang = localStorage.getItem('lang');
      if (lang === 'ar')  {
        return time12h.toLocaleTimeString('ar-EG', { hour12: true, hour: "numeric", minute: "numeric" });

      }else{

        return time12h.toLocaleTimeString('en-US', { hour12: true, hour: "numeric", minute: "numeric" });
      }

    }

}
