import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
// AOS
import * as AOS from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs';
import { COMPONENT_KEYWORDS } from 'src/app/component-keywords';
import { PatientService } from 'src/app/services/patient.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  public blogs: any[] = []
  public offers:any[]=[]
  storageUrl = environment.storageUrl
  titleKey
  descriptionKey
  services = []
  popularDoctors = []
  salamtakCapId=1;
  phone = '17143'

  //  = [
  //   {
  //     icon: 'assets/icons/Clinic-Bookings.svg',
  //     title : 'Clinic Bookings' ,
  //     description: 'You can book for free and pay in clinic' ,
  //     link: 'Book Now' ,
  //     route : '/'
  //   },
  //   {
  //     icon: 'assets/icons/Home-Visits.svg',
  //     title: 'Home Visits',
  //     description: 'You can book for free and pay in home',
  //     link: 'Book Now',
  //     route: '/'
  //   },
  //   {
  //     icon: 'assets/icons/Chats.svg',
  //     title: 'Chats',
  //     description: 'You can chat with us for any support',
  //     link: 'Chat Now',
  //     route: '/'
  //   },
  //   {
  //     icon: 'assets/icons/Calls.svg',
  //     title: 'Calls',
  //     description: 'You can call us for any support',
  //     link: 'Call Now',
  //     route: '/'
  //   },
  //   {
  //     icon: 'assets/icons/Vedio-call.svg',
  //     title: 'Vedio Call',
  //     description: 'You can book a video consultation',
  //     link: 'Book Now',
  //     route: '/'
  //   }

  // ];


  blog = [
    {



      icon: 'assets/icons/NSize/cap.png',
      title: 'Salamtak Cap',
      hex : '#fff',
      url:'/patient/SalamCap/4'

      // url:'/patient/SalamCap/1'


    },
    {
      icon: 'assets/icons/NSize/Care.png',
      title: 'articals',
      hex : '#fff',
      url:'/patient/care/3'


    },
    // Pharmacies
    {


      icon: 'assets/icons/NSize/TrueorFN.png',
      title: 'True Or False',
      hex : '#fff',
      url:'/patient/true/1'



    },
    // Laboratories
    {
      icon: 'assets/icons/NSize/scope.png',
      title: 'scoop',
      hex : '#fff',
      url:'/patient/scope/2'



    },
    // Radiology Center
    {
      icon: 'assets/icons/NSize/promotion.png',
      title: 'Whats ',
      hex : '#fff',
      url:'/patient/pro/5'


    },
    {
      icon: 'assets/icons/icon7.png',
      title: 'Radiology Center',
      hex : '#fff',
      url : '/patient/angel',
    }

  ]


  medicalServices = [
    {
      icon: 'assets/icons/Hospitals.svg',
      title: 'Hospitals',
      translate: 'hospitals',
      hex : '#BEB4D6',
      url : '/patient/hospitals'
    },
    // {
    //   icon: 'assets/icons/Polyclinics.svg',
    //   title: 'Polyclinics',
    //   translate: 'polyclinics',
    //   hex : '#F8B3CA',
    //   url : '/patient/polyclinics'
    // },
    // Pharmacies
    {
      icon: 'assets/icons/Pharmacies.svg',
      title: 'Pharmacies',
      translate: 'pharmacies',
      hex : '#C0ECCC',
      url : '/patient/pharmacies'
    },
    // Laboratories
    {
      icon: 'assets/icons/Laboratories.svg',
      title: 'Laboratories',
      translate: 'laboratories',
      hex : '#F4CDA6',
      url : '/patient/laboratories'
    },
    // Radiology Center
    {
      icon: 'assets/icons/Radiology-Center.svg',
      title: 'Radiology Centers',
      translate: 'radiology-center',
      hex : '#A5C8E4',
      url : '/patient/radiology-center'
    },
    {
      icon: 'assets/icons/Angle like laboratories.svg',
      title: 'RadiologyCenter',
      translate: 'emergency',
      hex : '#E8E8FD',
      url : '/patient/SalamtakAngel',
    },

  ]
  specialties = [
    // {
    //   image : 'assets/fake-images-for-test/Skin.png',
    //   title : 'Skin',
    // },
    // {
    //   image : 'assets/fake-images-for-test/Teeth.png',
    //   title: 'Teeth',
    // },
    // {
    //   image : 'assets/fake-images-for-test/Child.png',
    //   title: 'Child',
    // },
    // // Therapist
    // {
    //   image : 'assets/fake-images-for-test/Therapist.png',
    //   title: 'Therapist',
    // }
  ]
  specialtiesOwlOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<img src="assets/icons/Arrow-Left-2.svg">', '<img src="assets/icons/Arrow-Right-2.svg">'],
    autoplay: true,
    margin: 20,
    autoplayTimeout: 6000,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
  }


  testimonials = [
    {
      userImage : 'assets/fake-images-for-test/one.jpg',
      stars : 5,
      userName : 'تركيب التقويم المعدني',
      translate: 'tt',
      url:'/patient/offer',
      text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      userImage : 'assets/fake-images-for-test/two.jpg',
      stars : 5,
      userName : 'تنظيف البشرة',
      translate:'dd',
      url:'/patient/offer',
      text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      userImage : 'assets/fake-images-for-test/three.jpg',
      stars : 5,
      translate:'ll',
      userName : 'تقشير الوجه',
      url:'/patient/offer',
      text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
    ,
    {
      userImage : 'assets/fake-images-for-test/four.jpg',
      stars : 5,
      translate:'ss',
      userName : 'تنظيف الأسنان',
      url:'/patient/offer',
      text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      userImage : 'assets/fake-images-for-test/five.jfif',
      stars : 5,
      translate:'kk',
       url:'/patient/offer',
      text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      userImage : 'assets/fake-images-for-test/sex.jfif',
      stars : 5,
      translate:'qq',
       url:'/patient/offer',
      text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      userImage : 'assets/fake-images-for-test/seven.jfif',
      stars : 5,
      translate:'oo',
       url:'/patient/offer',
      text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },

  ]
  testimonialsOwlOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<img src="assets/icons/Arrow-Left-2.svg">', '<img src="assets/icons/Arrow-Right-2.svg">'],
    autoplay: true,
    margin: 20,
    autoplayTimeout: 6000,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
  }

constructor(
  private service : PatientService ,    private spinner: NgxSpinnerService,
  private patientService: PatientService,private translocoService: TranslocoService, private router: Router
) { }
showCustomView: boolean = false; // Variable to control the visibility of the custom view

// Function to toggle the visibility of the custom view
toggleCustomView() {
  this.showCustomView = !this.showCustomView;
}

  ngOnInit() {
    const lang = localStorage.getItem('lang');

    debugger
      if (lang) {
         if (lang === 'ar') {

  this.titleKey= 'سلامتك  |  وفر وقتك و مجهودك و احجز من تطبيق سلامتك كشف طبي من خلال الخدمات الطبية المتنوعة.  إحجز إستشارة طبية  الأن  بطريقة سهلة وامنة  مع نخبة أطباء سلامتك المعتمدين.'
  this.descriptionKey='سلامتك جروب هو  تطبيق طبي و استشارات طبية .  يمكنك الأن حجز دكتور في عيادات طبية او زياره منزليه  و متوفر ايضاً حجز دكتور اونلاين . تقدم سلامتك رعاية طبية و خدمات طبيه  متنوعة بطريقة امنة وسهلة من أي مكان و في أي وقت مثل كشف طبى و كشف اونلاين، بالاضافة امكانية حجز استشاره طبيه و استشارة طبية أون لاين مع افضل الاطباء ويمكنك الأن حجز دكتور في عيادات طبية او زياره منزليه  و متوفر ايضاً حجز دكتور اونلاين.'
        }
        else {
          this.titleKey= 'Salamtak Group | find a docotor near you.'
          this.descriptionKey= 'Salamtak Group provides heath services including home visits, online doctor visits, doctor appointment reservations, clinic reservation and online medical advice.'
        }
      }
    const keywords = COMPONENT_KEYWORDS.HomeComponent.join(', '); // Get keywords for HomeComponent
    this.service.updateDynamicMetaTags(this.titleKey, this.descriptionKey, keywords);



    AOS.init();
    this.getMedicalExaminationType();
    this.getPopularDoctors();
    this.getDoctorHealthTopics();
    this.getBlogs()

    this.getWhatsAppAds(); // 401 Unauthorized

    this.getoffers()
  }
  getMedicalExaminationType(){
    this.service.getMedicalExaminationType().pipe(map(res=>res['Data'])).subscribe(res => {
      this.services = res;
    })
  }
  getPopularDoctors(){
    this.service.getPopularDoctors().subscribe(res => {
      this.popularDoctors = res;
    })
  }
  getDoctorHealthTopics(){
    this.service.getDoctorHealthTopics().subscribe(res => {
      this.specialties = res['Data'];
    })
  }
  getWhatsAppAds(){
    this.service.getWhatsAppAds().subscribe(res => {
      console.log(res)

    })
  }
  getBlogs() {
    this.spinner.show()
    this.patientService.getBlogs().subscribe(res => {
      console.log(res['Data'])
      this.blogs = res['Data']
      this.spinner.hide()
    })
  }
  getoffers(){
    this.spinner.show()
    this.patientService.getOffers().subscribe(res=>{
      console.log(res['Data'])
      this.offers=res['Data']
      this.spinner.hide()

    })

  }
  navigateToOffer(offerId: number) {
     this.router.navigate([`/patient/offer/${offerId}`]);

  }
}
