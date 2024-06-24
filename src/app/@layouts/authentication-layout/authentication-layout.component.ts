import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ContactUsComponent } from 'src/app/core/authentication/contact-us/contact-us.component';
import { languages } from 'src/app/data/languages';

@Component({
  selector: 'app-authentication-layout',
  templateUrl: './authentication-layout.component.html',
  styleUrls: ['./authentication-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthenticationLayoutComponent {
  languages = languages;
  public IsEnglish=false;
  public IsArabic=true;
  selectedLanguage = this.languages[0];
  reviewsOwlOptions :OwlOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    items: 1,
    slideTransition: 'linear',
  }
  constructor(private translocoService: TranslocoService,public dialog: MatDialog) {
    this.selectedLanguage = this.languages.find(lang => lang.code === this.translocoService.getActiveLang());
  }
  setLanguage(lang: any) {
    this.selectedLanguage = lang;
    this.translocoService.setActiveLang(lang.code);
    localStorage.setItem('lang', lang.code);
    document.getElementsByTagName('html')[0].setAttribute('dir', lang.direction);
   }

//   ngOnInit(): void {

//     const lang = localStorage.getItem('lang');
//       if (lang) {
//          if (lang === 'ar') {
//          this.IsEnglish=false;
//          this.IsArabic=true;
//           // window.open('/termsAr')

//         }
//         else {
//           this.IsEnglish=true;
//           this.IsArabic=false;

//         }
// console.log("En"+ this.IsEnglish);
// console.log("Ar"+ this.IsArabic);
// console.log("locals"+ lang);
//    }
// }

  help(){
    // ContactUsComponent
    this.dialog.open(ContactUsComponent, {
      width: '500px',
      // height: '500px',
      data: {}
    });
  }
}
