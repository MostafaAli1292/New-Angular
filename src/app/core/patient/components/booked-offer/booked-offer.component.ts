import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { NgxSpinnerService } from 'ngx-spinner';
import { PatientService } from 'src/app/services/patient.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-booked-offer',
  templateUrl: './booked-offer.component.html',
  styleUrls: ['./booked-offer.component.scss']
})
export class BookedOfferComponent {
  HealthEntityId:any
  selectedOffer: any;
  offerId:any
  offerDetails=null
  storageUrl = environment.storageUrl;
  public IsEnglish;
  public IsArabic;
  constructor(
    private service : PatientService ,    private spinner: NgxSpinnerService,
    private patientService: PatientService,private translocoService: TranslocoService, private router: Router,private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    debugger
    this.route.params.subscribe(params => {
      this.offerId = parseInt(params['offerId']);
      this.selectedOffer = this.patientService.getSelectedOffer();

    });
     this.service.getOfferDetailsByOfferId(this.offerId).subscribe((res:any) => {


      this.offerDetails=res.Data


    })
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

  onClinicImgError(event,name) {
    event.target.src =  'https://ui-avatars.com/api/?name=' + name + '&background=2B2979&color=fff&size=100';
  }
}
