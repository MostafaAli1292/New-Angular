
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs';
import { MarketingServiceService } from 'src/app/core/Markting/MarketingService.service';
import { PatientService } from 'src/app/services/patient.service';
import { SearchFormService } from 'src/app/services/search-form.service';
import { environment } from 'src/environments/environment';
import { COMPONENT_KEYWORDS } from 'src/app/component-keywords';
import { TranslocoService } from '@ngneat/transloco';
@Component({
  selector: 'app-poly-clinic-doctors',
  templateUrl: './poly-clinic-doctors.component.html',
  styleUrls: ['./poly-clinic-doctors.component.scss']
})
export class PolyClinicDoctorsComponent {
  constructor(
    private service : PatientService,
    private form : SearchFormService,
    private route: ActivatedRoute,
    private mktService:  MarketingServiceService,
    private translocoService: TranslocoService,
    private spinner :NgxSpinnerService,
    private router: Router) {

      this.route.queryParams.subscribe(params => {
        this.ClinicId = params['ClinicId']
       console.log(params)
    });

  }
  ClinicId
  storageUrl = environment.storageUrl;
  public doctors : any = [];
  loading = false

  public doctorViewerOptions: any = {
    navbar: false,
    toolbar: false,
    title: false,
    movable: false,
  };


  bookFor(event,doctor){
    debugger
    event.preventDefault()
    const eventData: any = this.mktService.setEventData(
      'Patient Booked Doctor Appointment',
      `View Doctor Profile`,
      " ",
    );

     this.router.navigate(['/patient/doctor-profile',doctor.Id], { queryParams: {
      DoctorId : doctor.Id,
      ClinicId : doctor.ClinicID,
     } }).then(res=>{
      // MedicalExamationTypes not found for {Doctor/GetDoctorProfileByDoctorId} api so i save it in localstorage  to use it in doctor-profile component
      localStorage.setItem('doctor',JSON.stringify(doctor))
      sessionStorage.setItem  ('DoctorFees',doctor.FeesFrom);

    })
  }
  async ngOnInit(): Promise<void> {
   await this.getDoctors()
  }
    async getDoctors(value :any = null){
    debugger
    this.loading = true;
    this.spinner.show()

      this.service.GetDoctorPolyClinic(this.ClinicId).subscribe(res=>{
      // .pipe(map(res=>res['Data']))
      this.doctors = res['Data']
      this.spinner.hide()

    })

      this.loading = false


  }
}
