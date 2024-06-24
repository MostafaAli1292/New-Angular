import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryISO } from 'ngx-intl-tel-input';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs';
import { MarketingServiceService } from 'src/app/core/Markting/MarketingService.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss']
})
export class SecondStepComponent {
  @ViewChild('saveChanges') saveChanges :any;

  public patient
  public countries
  public cities
  areas
  public formSubmitted = false;
  public form:any = this.formbuilder.group({
    // CountryId : ['',Validators.required],
    CityId : ['',Validators.required],
    AreaId  : ['',Validators.required],
    Address  : ['',[Validators.required,Validators.pattern(/^(?=.*[\u0600-\u06FF])([0-9]*[\u0600-\u06FF]+[\u0600-\u06FF0-9\s]*)$/)]],
    BlockNo  : ['',Validators.nullValidator],
    FloorNo : ['',Validators.nullValidator],
    ApartmentNo : ['',Validators.nullValidator],


    // image:['',Validators.nullValidator],
    // // Address : ['',[Validators.required,Validators.pattern(/^[a-zA-Z ]*$/)]],
    // // FullNameAr : ['',[Validators.nullValidator,Validators.pattern(/[\u0600-\u06FF]/)]],

    // gender : ['',Validators.required],
    // day:['',Validators.required],
    // month:['',Validators.required],
    // year:['',Validators.required],
    // Occupation : ['',Validators.required],
  });
  public user

  constructor(
    private formbuilder:FormBuilder,
    private route:ActivatedRoute,
    private service : AuthenticationService,
    private spinner:NgxSpinnerService,
    private mktService:  MarketingServiceService,

    private router:Router
    ) {
      this.service.currentUser.subscribe(currentUserSubject => this.user = currentUserSubject)
    }

  ngOnInit(): void {
    // get prams from url
    debugger

    this.route.queryParams.subscribe((params:any) => {
      if(params.redirect){
        // const form :any = sessionStorage.getItem('sign-up-first-step');
        // console.log(JSON.parse(form));
        // this.form.patchValue(JSON.parse(form));
        // this.getCountries()
        // this.getOccupations();
        this.getCities();

      }else{
        // this.getCountries()

        // this.getOccupations();
        this.getPatient();
      }
    })

  }
  // first form
  // getCountries(){
  //   this.spinner.show();
  //  return this.service.getCountries().pipe(map(res=>res['Data'])).subscribe((res:any)=>{
  //     this.countries = res;
  //     this.spinner.hide();
  //   })
  // }
  // getOccupations(){
  //   this.spinner.show();
  //   this.service.getOccupations().pipe(map(res=>res['Data'])).subscribe((res:any)=>{
  //     console.log(res)
  //     this.occupations = res;
  //     this.spinner.hide();

  //   })
  // }
  getPatient(){
    this.spinner.show();
    this.service.GetPatient().pipe(map(res=>res['Data'])).subscribe((patient:any)=>{
      this.patient = patient;
      this.form.controls['Address'].setValue(patient.Address);
      // set city id to form

      // set area id to form



      // this.form.controls['CityId'].setValue(patient.CityId);
      // this.form.controls['AreaId'].setValue(patient.AreaId);

      // this.getAreas(patient.CityId)
      this.form.controls['BlockNo'].setValue(patient.BlockNo);
      this.form.controls['FloorNo'].setValue(patient.FloorNo);
      this.form.controls['ApartmentNo'].setValue(patient.ApartmentNo);
      // this.form.controls['FullNameEn'].setValue(patient.FullNameEn);

      // this.form.controls['FullNameAr'].setValue(patient.FullNameAr);
      // var gender = (patient.GenderId == 1 ? 'male' : 'female');
      // this.setGenderValueToForm(gender)
      // birth date
      // var date = new Date(patient.Birthdate);
      // var day = date.getDate();
      // var month = date.getMonth() + 1;
      // var year = date.getFullYear();
      // this.setDayValueToForm(day)
      // this.setMonthValueToForm(month)
      // this.setYearValueToForm(year)
      // CountryId
      // get CountryId object from countries array
      console.log(this.patient)
      console.log(this.patient)
      this.getCities();


      this.spinner.hide();
    })
  }

  // setGenderValueToForm(Gender:String){
  //   this.form.controls['gender'].setValue(Gender);
  // }


  // setCountryIdToForm(CountryId:any){
  //   this.form.controls['CountryId'].setValue(CountryId);

  //   this.getCities(CountryId.Id)
  // }
  getCities(CountryId:any = 1){
    // 1 for Egypt CountryId default value
    this.spinner.show();
    this.service.getCities(CountryId).pipe(map(res=>res['Data'])).subscribe((res:any)=>{
      console.log(res)
      this.cities = res;
      this.spinner.hide();
      try {
        this.cities.forEach((city:any) => {
          if(city.Id == this.patient.CityId){
            this.form.controls['CityId'].setValue(city);
            this.setCityIdToForm(city)
          }
        });
      } catch (error) {

      }

      if(this.patient){
        // this.cities.forEach((city:any) => {
        //   if(city.Id == this.patient.CityId){
        //     this.form.controls['CityId'].setValue(city);
        //   }
        // });

        this.getAreas(this.patient.CityId)
      }else{
        setTimeout(() => {
          this.saveChanges.nativeElement.removeAttribute('disabled');
        }, 200);
      }

    })
  }
  getAreas(CityId:any){
    this.spinner.show();
    this.areas = [];
    this.setAreaIdToForm(null);

    this.service.getAreas(CityId).pipe(map(res=>res['Data'])).subscribe((res:any)=>{
      console.log(res)
      this.areas = res;
      this.spinner.hide();
      if(this.patient){
        this.areas.forEach((area:any) => {
          if(area.Id == this.patient.AreaId){
            this.form.controls['AreaId'].setValue(area);
          }
        });
      }
      setTimeout(() => {
        this.saveChanges.nativeElement.removeAttribute('disabled');
      }, 200);
    })
  }
  setCityIdToForm(CityId:any){
    this.form.controls['CityId'].setValue(CityId);
    this.getAreas(CityId.Id)

  }
  setAreaIdToForm(AreaId:any){
    this.form.controls['AreaId'].setValue(AreaId);
  }
  // setOccupationToForm(Occupation:any){
  //   this.form.controls['Occupation'].setValue(Occupation);
  // }
  get ff() {return this.form.controls}
  formSubmit(){
    debugger
    this.formSubmitted = true;

    console.log(this.form.value)

    if (this.form.invalid) {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      return
    }
    // this.form.value.CountryId =  this.form.value.CountryId.Id

    // alert(JSON.stringify({...this.form.value}))
    console.log(this.form.value)
    // formData.append('Address',form.Address)
    // formData.append('FullNameAr',form.FullNameAr)
    // formData.append('OccupationId',form.OccupationId)
    // formData.append('GenderId',form.GenderId)
    // formData.append('Birthdate',form.Birthdate)
    // formData.append('CountryIdId',form.CountryIdId)
    // formData.append('profileImage',form.profileImage)

    // convert image from base64 to file
    // alert(JSON.stringify(this.form.value))


    this.spinner.show();
    this.service.UpdatePatientProfileSecondStep(this.form.value).pipe(map(res=>res['Data'])).subscribe((res:any)=>{
      console.log(res)
      this.spinner.hide();
      // this.service.setStep(2);

      const eventData: any = this.mktService.setEventData(
        'Update Profile - Second Step',
        `Signup Second Step`,
        "Second Step",
      );

      this.mktService.onEventFacebook(eventData);

      let currentUser = JSON.parse(localStorage.getItem(`${environment.localStorageUserKey}`)!);
      currentUser.ProfileStatus =res.ProfileStatus;
      localStorage.setItem('currentUser',JSON.stringify(currentUser));
      console.log(this.user)
      // this.router.navigate(['/patient/profile/medical-state'])

      window.location.href='/patient/profile/medical-state';

      // this.router.navigate(['/patient/profile'])
    })
    // const image = (this.form.value.image == '' ? '' : this.dataURLtoFile(this.form.value.image,'profileImage.png'));
    // var form = {
    //   Address:this.form.value.Address,
    //   FullNameAr:this.form.value.FullNameAr,
    //   // Phone:this.form.value.Phone,
    //   // Email:this.form.value.Email, // not required
    //   Birthdate : `${this.form.value.day}-${this.form.value.month}-${this.form.value.year}`,
    //   // Gender 1 for Male 2 Female
    //   GenderId : + (this.form.value.gender == 'male' ? 1 : 2),
    //   CountryIdId : + this.form.value.CountryId.Id,
    //   OccupationId : + this.form.value.Occupation.Id,
    //   // from base64 to file
    //   profileImage : image
    // }

    // if(!this.patient){
    //   this.service.CreatePatientProfileFirstStep(form).subscribe((res:any)=>{
    //     console.log(res)
    //     this.router.navigate([], { queryParams: { redirect: null }, queryParamsHandling: 'merge' }).then(() => {
    //       window.location.reload();
    //     });
    // this.spinner.hide();

    //   })
    // }else{
    //   this.service.UpdatePatientProfileFirstStep(form).subscribe((res:any)=>{
    //     console.log(res)
    //     this.spinner.hide();

    //   })
    // }



  }
  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  nextStep(){
    this.formSubmit();
    // this.service.setStep(2);

  }
  previousStep(){
    // this.formSubmit();

    // this.service.setStep(0);
    this.router.navigate(['/patient/profile/personal-info'])

  }
}
