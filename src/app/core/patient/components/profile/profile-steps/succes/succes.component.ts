import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { TranslocoService } from '@ngneat/transloco';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { languages } from 'src/app/data/languages';


@Component({
  selector: 'app-succes',
  templateUrl: './succes.component.html',
  styleUrls: ['./succes.component.scss']
})
export class SuccesComponent {
  languages = languages;
  selectedLanguage = this.languages[0];
   isCollapsed = false;
  public IsEnglish=false;
  public IsArabic=true;
  flag:any
username:any;
  // user :any= null
  public user
  constructor(private authentication:AuthenticationService,private _bottomSheet: MatBottomSheet,private translocoService: TranslocoService) {
    this.authentication.currentUser.subscribe(currentUserSubject => {
      this.user = currentUserSubject;
      console.log(this.user)
      console.log(currentUserSubject)
    })
   }

   ngOnInit(): void {
    debugger
    const form :any = sessionStorage.getItem('sign-up-first-step');
    console.log(JSON.parse(form));
    var date=JSON.parse(form);

    const lang = localStorage.getItem('lang');

    debugger
      if (lang) {
         if (lang === 'ar') {
         this.IsEnglish=false;
         this.IsArabic=true;
         this.username=date.FullNameAr



          // window.open('/termsAr')

        }
        else {
          this.IsEnglish=true;
          this.IsArabic=false;
          this.username=date.FullNameEn



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



  //  console.log(this.user)
  debugger
    // this.image=this.user.extra.Image
}
setLanguage(lang: any) {
  debugger
  this.selectedLanguage = lang;
  this.translocoService.setActiveLang(lang.code);
  localStorage.setItem('lang', lang.code);
  document.getElementsByTagName('html')[0].setAttribute('dir', lang.direction);

  window.location.reload()
}
}
