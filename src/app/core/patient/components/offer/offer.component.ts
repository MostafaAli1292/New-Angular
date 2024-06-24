import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { NgxSpinnerService } from 'ngx-spinner';
import { PatientService } from 'src/app/services/patient.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent {
  offers:any;
  offerCategory:any;
  storageUrl = environment.storageUrl;
  lang

  constructor(
    private service : PatientService ,    private spinner: NgxSpinnerService,
    private patientService: PatientService,private translocoService: TranslocoService, private router: Router,private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.lang=localStorage.getItem('lang')
    this.offerCategory = parseInt(this.route.snapshot.params['offerId']);
    this.getOfferByCategory()
  }
  getOfferByCategory(){
    debugger
    this.spinner.show(); // Show the spinner
    this.patientService.gerOffersByCategory(this.offerCategory).subscribe(res=>{
      console.log(res['Data'])
      this.offers=res['Data']
      this.spinner.hide()

    })
  }
  onBookNow(offerId: number): void {
    debugger
    const selectedOffer = this.offers.find((offer) => offer.Id === offerId);

    if (selectedOffer) {
      this.patientService.setSelectedOffer(selectedOffer);
      this.router.navigate([`/patient/bookOffer/${offerId}`]);
    }
  }
}
