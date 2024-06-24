import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ViewportScroller } from '@angular/common';
import { PatientService } from 'src/app/services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { languages } from 'src/app/data/languages';
import { TranslocoService } from '@ngneat/transloco';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent {
  public doctorId = this.route.snapshot.paramMap.get('doctorId')
  doctor = null
  languages = languages;
  selectedLanguage = this.languages[0];
  videos: any = [];
  loadingVideos = false;

doctorFees:any;
  storageUrl = environment.storageUrl;
EditAppointmentID=null;
  reviews :any = null
  AvalibleDate = null
  ClinicId = null
  public IsEnglish;
  public IsArabic;
  constructor(
    private service: PatientService,
    public route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private translocoService: TranslocoService,
    private sanitizer: DomSanitizer
    ) { }

    setLanguage(lang: any) {
      debugger
      this.selectedLanguage = lang;
      this.translocoService.setActiveLang(lang.code);
      localStorage.setItem('lang', lang.code);
      document.getElementsByTagName('html')[0].setAttribute('dir', lang.direction);
      window.location.reload()

    }
  ngOnInit(): void {
    this.getDoctorDetail()
    this.getDoctorVideos()
    this.getDoctorRateByDoctorIdPagedList();
    this.doctorFees=sessionStorage.getItem('DoctorFees')
    // get params from url
    debugger

    this.route.queryParams.subscribe(params => {
      this.AvalibleDate = params['AvalibleDate'];
      this.ClinicId = params['ClinicId'];


      console.log( params)
      // ClinicId

    });

    const lang = localStorage.getItem('lang');
    if (lang) {
       if (lang === 'ar') {
       this.IsEnglish=false;
       this.IsArabic=true;
        // window.open('/termsAr')

      }
      else {
        this.IsEnglish=true;
        this.IsArabic=false;

      }
console.log("En"+ this.IsEnglish);
console.log("Ar"+ this.IsArabic);
console.log("locals"+ lang);
 }

  }
  getDoctorVideos(){
    debugger
    this.loadingVideos = true
    this.spinner.show()
    this.service.GetDoctorVideos(this.doctorId).subscribe(res=>{
      console.log(res['Data'])
      this.videos = res['Data'];
      this.spinner.hide()
      this.loadingVideos = false

    });

   }
   extractYouTubeVideoID(url: string): string {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : url;
  }
  sanitizeUrll(videoUrl: string): SafeResourceUrl {
    // const url = `https://www.youtube.com/embed/${videoUrl}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
   }
  getDoctorDetail(doctorId = this.doctorId){
    debugger
    this.spinner.show()
    this.service.getDoctorDetail(doctorId,0,new Date().toISOString().split('T')[0],).subscribe(res => {
      debugger
      this.doctor = res['Data']
      console.log(this.doctor)


      this.spinner.hide()
      // بناء علي طلب مرسي لانه لا يوجد معلومات عن صور العيادات في بيانات الدكتور
      res['Data']['clinicDtos'].forEach(clinic => {
        // this.ClinicId
        // add active class if ClinicId == clinic['ClinicId']
        if(this.ClinicId == clinic['ClinicId']){
          clinic['active'] = true
        }else{
          clinic['active'] = false
        }
        // clinic['images']= this.getClinicGalleryByClinicId(clinic['ClinicId'])
      });
    })
  }
  getClinicGalleryByClinicId(clinicId){
    this.spinner.show()
    var clinicImages :any = []
    this.service.getClinicGalleryByClinicId(clinicId).subscribe(res => {
      clinicImages.push(res['Data'])
      this.spinner.hide()
    })
    return clinicImages
  }

  onClinicImgError(event,name) {
    event.target.src =  'https://ui-avatars.com/api/?name=' + name + '&background=2B2979&color=fff&size=100';
  }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
  // on close component
  ngOnDestroy() {
    // localStorage.removeItem('doctor')
  }
  sanitizeUrl(videoUrl: string): SafeResourceUrl {
    if (videoUrl) {
        const url = `https://www.youtube.com/embed/${this.extractVideoId(videoUrl)}`;
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return '';
}

// Extract video ID from YouTube URL
extractVideoId(videoUrl: string): string | null {
    if (videoUrl && (videoUrl.includes('v=') || videoUrl.includes('youtu.be'))) {
        const startIndex = videoUrl.includes('v=') ? videoUrl.indexOf('v=') + 2 : videoUrl.indexOf('youtu.be') + 9;
        const videoId = videoUrl.substring(startIndex, startIndex + 11);
        return videoId;
    }
    return null;
}

  getDoctorRateByDoctorIdPagedList(){
    this.spinner.show()
    this.service.getDoctorRateByDoctorIdPagedList(this.doctorId,1,10).subscribe(res => {
      console.log('*********')
      this.reviews = res['Data']['Items']
      console.log(res['Data']['Items'])
      this.spinner.hide()
    })
  }
}
