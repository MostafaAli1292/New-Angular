import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ChangeLanguageComponent } from '../../pop-ups/change-language/change-language.component';
import { languages } from 'src/app/data/languages';
import { TranslocoService } from '@ngneat/transloco';
import { map } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  languages = languages;
  selectedLanguage = this.languages[0];
  isCollapsed = false;
  public IsEnglish=false;
  public IsArabic=true;
  flag:any
  reloded=false;

  public patient
  public forms:any={
    FullNameEn:[''],
    FullNameAr:[''],
    Phone:[''],
    Email:[''],
    Password:[''],
    ConfirmPassword:[''],
    image:[''],
    Terms:['']

  }
username:any;
  // user :any= null
  public user
  constructor(private authentication:AuthenticationService,private _bottomSheet: MatBottomSheet,private translocoService: TranslocoService, private service : PatientService,      private router: Router,
    ) {
    this.authentication.currentUser.subscribe(currentUserSubject => {
      this.user = currentUserSubject;
      console.log(this.user)
      console.log(currentUserSubject)
    })
   }



  ngOnInit(): void {
    debugger;
    debugger
    var langLS = localStorage.getItem('lang');
if(!langLS)
    localStorage.setItem('lang','en' );
  if(this.user!=null){
    if(this.user.ProfileStatus >=1){
      this.getPatient();
    }
  }

  const form :any = sessionStorage.getItem('sign-up-first-step');
     console.log(JSON.parse(form));
     var date=JSON.parse(form);




  //  console.log(this.user)
  debugger
  const lang = localStorage.getItem('lang');

  debugger
    if (lang) {
       if (lang === 'ar') {
       this.IsEnglish=false;
       this.IsArabic=true;
        // this.userName=this.user.NameAR;



        // window.open('/termsAr')

      }
      else {
        this.IsEnglish=true;
        this.IsArabic=false;
        // this.userName=this.user.Name


      }
      let Selected_lang =  this.languages.find(t=>t.code ===lang);


      this.selectedLanguage = Selected_lang;
      this.translocoService.setActiveLang(Selected_lang.code);
      this.translocoService.setActiveLang(Selected_lang.code);
      localStorage.setItem('lang', Selected_lang.code);
      document.getElementsByTagName('html')[0].setAttribute('dir', Selected_lang.direction);
      this.flag=Selected_lang.flag
     console.log("En"+ this.IsEnglish);
     console.log("Ar"+ this.IsArabic);
     console.log("locals"+ lang);
 }
    // this.image=this.user.extra.Image
}


  collapse(){
    this.isCollapsed = !this.isCollapsed;
    console.log('collapse')
  }
  signOut(){
    this.authentication.logout();
    // this.user = {};
  }
  changeLanguage(): void {
    this._bottomSheet.open(ChangeLanguageComponent);
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    var element :any = document.querySelector('.navbar');
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('sticky');
    } else {
      element.classList.remove('sticky');
    }
  }
  setLanguage(lang: any) {
    debugger
    this.selectedLanguage = lang;
    this.translocoService.setActiveLang(lang.code);
    localStorage.setItem('lang', lang.code);
    document.getElementsByTagName('html')[0].setAttribute('dir', lang.direction);
    // this.service.getMedicalExaminationType().pipe(map(res=>res['Data'])).subscribe(res => {

    //  })
    if(!this.reloded)
    {
      this.reloded=true;
     window.location.reload()
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
          this.flag=Selected_lang.flag
         console.log("En"+ this.IsEnglish);
         console.log("Ar"+ this.IsArabic);
         console.log("locals"+ lang);
         console.log(this.username)
     }

    })
  }
}
