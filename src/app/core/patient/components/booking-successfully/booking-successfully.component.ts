import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AddNoteForDoctorComponent } from '../../pop-ups/add-note-for-doctor/add-note-for-doctor.component';
import { languages } from 'src/app/data/languages';
import { TranslocoService } from '@ngneat/transloco';


 import { OwlOptions } from 'ngx-owl-carousel-o';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { trigger, transition, style, animate } from '@angular/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking-successfully',
  templateUrl: './booking-successfully.component.html',
  styleUrls: ['./booking-successfully.component.scss']
})
export class BookingSuccessfullyComponent {
  booking
  public user
  public IsArabic
  public IsEnglish
  public patient
  address:any
  area:any
  floor:any;
  appartment:any;
  languages = languages;
  username:any;
  fees:any
  selectedLanguage = this.languages[0];
  constructor(public dialog: MatDialog,
    private router : Router,
    private translocoService: TranslocoService  ,
    private authentication : AuthenticationService
     ) {
      this.authentication.currentUser.subscribe(currentUserSubject => this.user = currentUserSubject)
      console.log(this.user)
    // this.addNote();
    debugger
    this.booking = JSON.parse(localStorage.getItem('bookingData') || '{}') ;

     // this.address = this.booking['clinic']['CityName']+""+this.booking['clinic']['AreaName']+""+ this.booking['clinic']['Address'];
    // if(this.booking['Clinic']['FloorNo'] != null && this.booking['Clinic']['FloorNo']!='0')
    // this.address=this.address+" "+this.booking['Clinic']['FloorNo'] ;
    // if(this.booking['Clinic']['ApartmentNo'] != null && this.booking['Clinic']['ApartmentNo']!='0')
    // this.address=this.address+" "+this.booking['Clinic']['ApartmentNo'] ;


     console.log(this.address)
    console.log(this.booking)
    console.log(this.booking)
    console.log(this.booking)
    console.log(this.booking)
  }
  ngOnInit(): void {
this.getPatient()
this.fees=sessionStorage.getItem('Fees');
debugger
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
        this.appartment="رقم الشقة "



      }
console.log("En"+ this.IsEnglish);
console.log("Ar"+ this.IsArabic);
console.log("locals"+ lang);
 }

 this.booking = JSON.parse(localStorage.getItem('bookingData') || '{}') ;
 this.area=this.booking['clinic']['CityName']+" "+this.booking['clinic']['AreaName'];
 this.address = this.booking['clinic']['Address'];
 if(this.booking['clinic']['FloorNo'] != null && this.booking['clinic']['FloorNo']!='0'){

   this.address=this.address+" "+  this.floor+" "+this.booking['clinic']['FloorNo'] ;
 }

 if(this.booking['clinic']['ApartmentNo'] != null && this.booking['clinic']['ApartmentNo']!='0'){

   this.address=this.address+" "+this.appartment+" "+this.booking['clinic']['ApartmentNo'] ;
 }


  }
  setLanguage(lang: any) {
    debugger
    this.selectedLanguage = lang;
    this.translocoService.setActiveLang(lang.code);
    localStorage.setItem('lang', lang.code);
    document.getElementsByTagName('html')[0].setAttribute('dir', lang.direction);
    window.location.reload()

  }
  addNote(): void {
    const dialogRef = this.dialog.open(AddNoteForDoctorComponent, {
      data: {},
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  goToDoctor(doctor){
    // iso date

    this.router.navigate(['/patient/doctor-profile',doctor.Id], { queryParams: {
      DoctorId : doctor.Id,
      AvalibleDate : new Date().toISOString().split('T')[0] ,
    } }).then(res=>{
      localStorage.setItem('doctor',JSON.stringify(doctor))
    })
  }

  returnWeekDay(item: any) {
    debugger
    var dt=item.substring(0,10)
    var tm= item.substring(11)
    var h=tm.split(':')[0]
    var minu=tm.split(':')[1]
    var y=dt.split('-')[0]
    var m= parseInt( dt.split('-')[1])-1
    var d=dt.split('-')[2]
    const lang = localStorage.getItem('lang');
     this.convertTime24to12(tm)
    const date = new Date(y,m,d)


    const options:any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
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


  getPatient(){
    debugger
    this.authentication.GetPatient().subscribe((patient:any)=>{
      this.patient = patient;
      const lang = localStorage.getItem('lang');

      debugger
        if (lang) {

           if (lang === 'ar') {
           this.IsEnglish=false;
           this.IsArabic=true;
           this.username=this.patient.Data.FullNameAr



            // window.open('/termsAr')

          }
          else {
            this.IsEnglish=true;
            this.IsArabic=false;
            this.username=this.patient.Data.FullName



          }
          let Selected_lang =  this.languages.find(t=>t.code ===lang);


          this.selectedLanguage = Selected_lang;
          this.translocoService.setActiveLang(Selected_lang.code);
          this.translocoService.setActiveLang(Selected_lang.code);
          localStorage.setItem('lang', Selected_lang.code);
          document.getElementsByTagName('html')[0].setAttribute('dir', Selected_lang.direction);
          console.log("En"+ this.IsEnglish);
         console.log("Ar"+ this.IsArabic);
         console.log("locals"+ lang);
      }

    })
  }



}
