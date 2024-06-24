import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-listing-layout',
  templateUrl: './listing-layout.component.html',
  styleUrls: ['./listing-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListingLayoutComponent {
  __URL:string = ""
  isHideSearch = false

  constructor(router : Router) {
    this.__URL = router.url
    this.removeSearchBar()
    console.log(router.url)
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      console.log(event.urlAfterRedirects);
      this.__URL = event.urlAfterRedirects
    this.removeSearchBar()


    })


  //  router.events
  // .pipe(
  //   filter(e => e instanceof NavigationEnd)
  // )
  // .subscribe( (navEnd:any) => {
  //   console.log(navEnd.urlAfterRedirects);
  //   if (
  //     navEnd.urlAfterRedirects.includes('booking-successfully')

  //     ) {
  //     this.isHideSearch = true
  //   }else{
  //     this.isHideSearch = false
  //   }
  //   // get route name from url
  // });
  }
  removeSearchBar(){
    // remove search bar from booking-successfully and doctor-profile page
    if(this.__URL.includes('find-a-doctor')){
      this.isHideSearch = false
    }else{
      this.isHideSearch = true
    }
      return

    if (
      this.__URL.includes('booking-successfully') ||
      this.__URL.includes('blogs') ||
      this.__URL.includes('about') ||
      this.__URL.includes('contact-us') ||
      this.__URL.includes('appointments') ||
      this.__URL.includes('my-schedule') ||
      this.__URL.includes('patient') ||
      this.__URL.includes('change-password')
      ) {
      this.isHideSearch = true
    }else{
      this.isHideSearch = false
    }
  }
}
