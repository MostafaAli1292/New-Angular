import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})


export class FooterComponent {
  isCollapsed = false;
  constructor( private translocoService: TranslocoService
    ) { }
  goto(){
    debugger

    const lang = localStorage.getItem('lang');
    if (lang) {
      this.translocoService.setActiveLang(lang);
      if (lang === 'ar') {
        document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
        window.open('/patient/termsOfAr')

      }
      else {
        document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
        window.open('/patient/termsOf')

      }
    }


    // window.open('/patient/termsOf')

    // this.router.navigate(['/patient/termsOf'])

  }
  gotoPrivacy(){
    debugger

    const lang = localStorage.getItem('lang');
    if (lang) {
      this.translocoService.setActiveLang(lang);
      if (lang === 'ar') {
        document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
        window.open('/patient/privacyPolicyAr')

      }
      else {
        document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
        window.open('/patient/privacyPolicy')

      }
    }
  }

  gotoDoctorPrivacy(){

    const lang = localStorage.getItem('lang');
    if (lang) {
      this.translocoService.setActiveLang(lang);
      if (lang === 'ar') {
        document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
        window.open('/patient/doctorPrivacyAr')

      }
      else {
        document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
        window.open('/patient/doctorPrivacy')

      }
    }
  }
  gotoDoctorWebsite(){
    window.open('https://doctor.salamtakgroup.com')
  }
  gotoDoctorWebsi(){
    Swal.fire({
      title: this.translocoService.translate('swal.Soon.title'),
      icon: 'question',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.translocoService.translate('swal.Soon.ConfirmButtonText')
    })
  }
  collapse(){
    this.isCollapsed = !this.isCollapsed;
    console.log('collapse')
  }
}
