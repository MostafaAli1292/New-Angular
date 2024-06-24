import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { CountryISO } from 'ngx-intl-tel-input';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs';
import { MarketingServiceService } from 'src/app/core/Markting/MarketingService.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent {
  // #saveChanges
  @ViewChild('saveChanges') saveChanges :any;

  CountryISO = CountryISO;
  @ViewChild(NgxMatIntlTelInputComponent, { static: true })
  private phoneComponent: any;
  public countries
  public occupations
  public patient
  public formSubmitted = false;
  public user
public gen
  public form:any = this.formbuilder.group({
    image:['',Validators.nullValidator],
    FullNameEn : ['', [Validators.required, this.customValidator()]],
    FullNameAr : ['', [Validators.required, this.arabicThreeWordsValidator()]],

    // غير مفعل حاليا
    // phone max length 11
    // Phone:['',[Validators.required,Validators.maxLength(11)]],
    // Email:['',[Validators.required,Validators.email]],
    gender : ['',Validators.required],
    day:['',Validators.required],
    month:['',Validators.required],
    year:['',Validators.required],
    Nationality : ['',Validators.required],
    Occupation : [''],
  });

  constructor(
    private formbuilder:FormBuilder,
    private route:ActivatedRoute,
    private service : AuthenticationService,
    private spinner:NgxSpinnerService,
    private mktService:  MarketingServiceService,

    private translocoService: TranslocoService,
    private router:Router
    ) {
      this.service.currentUser.subscribe(currentUserSubject => this.user = currentUserSubject)
      console.log(this.user)
    }

  ngOnInit(): void {
    this.getCountries()
    if(this.user.ProfileStatus != 0){
      this.getPatient();
    }

    // get prams from url
    // this.route.queryParams.subscribe((params:any) => {
    //   if(params.redirect){
    //     const form :any = sessionStorage.getItem('sign-up-first-step');
    //     console.log(JSON.parse(form));
    //     this.form.patchValue(JSON.parse(form));
    //     this.getCountries()
    //     // this.getOccupations();
    //   }else{
    //     this.getCountries()
    //     // this.getOccupations();
    //     this.getPatient();
    //   }
    // })

  }
  // first form
  getCountries(){
    this.spinner.show();
   return this.service.getCountries().pipe(map(res=>res['Data'])).subscribe((res:any)=>{
      this.countries = res;
      this.spinner.hide();
      // remove disabled attr from saveChanges
      setTimeout(() => {
        this.saveChanges.nativeElement.removeAttribute('disabled');
      }, 200);
    })
  }
  getOccupations(){
    this.spinner.show();
    this.service.getOccupations().pipe(map(res=>res['Data'])).subscribe((res:any)=>{
      console.log(res)
      this.occupations = res;
      this.spinner.hide();

    })
  }
  getPatient(){
    this.spinner.show();
    this.service.GetPatient().pipe(map(res=>res['Data'])).subscribe((patient:any)=>{
      console.log(patient);

      this.patient = patient;
      this.service.currentUserValue.Name=patient.FullName
      this.service.currentUserValue.NameAR=patient.FullNameAr;
      localStorage.setItem('currentUser', JSON.stringify(this.service.currentUserValue))
this.service.currentUserSubject.next(this.service.currentUserValue)
        console.log(this.service.currentUserValue.Name);
      this.form.controls['FullNameEn'].setValue(patient.FullName);
      this.form.controls['FullNameAr'].setValue(patient.FullNameAr);
      this.form.controls['Occupation'].setValue(patient.OccupationId);

        //  this.translocoService.translate('form.input.gender.male ')


      var gender = (patient.GenderId);
      this.setGenderValueToForm(gender)
      // birth date
      var date = new Date(patient.Birthdate);
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      this.setDayValueToForm(day)
      this.setMonthValueToForm(month)
      this.setYearValueToForm(year)
      // Nationality
      // get nationality object from countries array
      setTimeout(() => {
        this.countries.find((country:any) => {
          if(country.Id == patient.NationalityId){
            this.setNationalityToForm(country)
          }
        })
        // Occupation
        // get occupation object from occupations array
        // this.occupations.find((occupation:any) => {
        //   if(occupation.Id == patient.OccupationId){
        //     this.setOccupationToForm(occupation)
        //   }
        // })
      }, 500);

      console.log(this.patient)
      console.log(this.patient)
      this.spinner.hide();
    })
  }

  setGenderValueToForm(Gender:number){
    if(Gender==1){
      this.form.controls['gender'].setValue(this.translocoService.translate('form.input.gender.male'));
     }else if (Gender==2){
      this.form.controls['gender'].setValue(this.translocoService.translate('form.input.gender.female'));

     }
  }
  setDayValueToForm(day:any){
    this.form.controls['day'].setValue(day);
  }
  setMonthValueToForm(month:any){
    this.form.controls['month'].setValue(month);
  }
  setYearValueToForm(year:any){
    this.form.controls['year'].setValue(year);
  }
  getYears(){
    let years :any = [];
    const currentYear = new Date().getFullYear();
    for(let i = 1900; i <= currentYear; i++){
      years.push(i);
    }
    return years.reverse();
  }
  setNationalityToForm(Nationality:any){
    this.form.controls['Nationality'].setValue(Nationality);
  }
  // setOccupationToForm(Occupation:any){
  //   this.form.controls['Occupation'].setValue(Occupation);
  // }
  get ff() {return this.form.controls}
  formSubmit(){
    debugger
    this.formSubmitted = true;

    console.log(this.form.value)


    // get invalid form control
    // const invalid :any= [];
    // const controls = this.form.controls;
    // for (const name in controls) {
    //   if (controls[name].invalid) {
    //     invalid.push(name);
    //   }
    // }
    if (this.form.invalid) {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      return
    }
    // this.form.value.Nationality =  this.form.value.Nationality.Id

    // alert(JSON.stringify({...this.form.value}))
    console.log(this.form.value)
    // formData.append('FullNameEn',form.FullNameEn)
    // formData.append('FullNameAr',form.FullNameAr)
    // formData.append('OccupationId',form.OccupationId)
    // formData.append('GenderId',form.GenderId)
    // formData.append('Birthdate',form.Birthdate)
    // formData.append('NationalityId',form.NationalityId)
    // formData.append('profileImage',form.profileImage)

    // convert image from base64 to file

    this.spinner.show();
    const image = (this.form.value.image == '' ? '' : this.dataURLtoFile(this.form.value.image,'profileImage.png'));
    var form = {
      FullNameEn:this.form.value.FullNameEn,
      FullNameAr:this.form.value.FullNameAr,
      // Phone:this.form.value.Phone,
      // Email:this.form.value.Email, // not required
      Birthdate : `${this.form.value.day}-${this.form.value.month}-${this.form.value.year}`,
      // Gender 1 for Male 2 Female
      GenderId : + (this.form.value.gender == this.translocoService.translate('form.input.gender.male') ? 1 : 2),
      NationalityId : + this.form.value.Nationality.Id,
      OccupationId: this.form.value.Occupation,
      // OccupationId : + this.form.value.Occupation.Id,
      // from base64 to file
      profileImage : image
    }

    if(this.user.ProfileStatus == 0){

      this.service.CreatePatientProfileFirstStep(form).subscribe((res:any)=>{
        console.log(res)
        debugger
        const eventData: any = this.mktService.setEventData(
          'Registration-First Step',
          `Signup First Step`,
          "New First Step",
        );

        this.mktService.onEventFacebook(eventData);

        this.router.navigate([], { queryParams: { redirect: null }, queryParamsHandling: 'merge' }).then(() => {
          // window.location.reload();
        });
        this.spinner.hide();
    // this.service.setStep(1);
        /*
        * 	 path => import { Router } from '@angular/router';
        * 	 param => private router: Router
        */
       let currentUser = JSON.parse(localStorage.getItem(`${environment.localStorageUserKey}`)!);
       currentUser.ProfileStatus =res.Data.ProfileStatus ;
       localStorage.setItem('currentUser',JSON.stringify(currentUser));

         this.router.navigate(['/patient/profile/location'])
          // this.user.ProfileStatus = res.Data.ProfileStatus;


      })
    }else{
      this.service.UpdatePatientProfileFirstStep(form).subscribe((res:any)=>{
        console.log(res);
        const eventData: any = this.mktService.setEventData(
          'Update Profile First Step',
          `Signup First Step`,
          "Update First Step",
        );

        this.mktService.onEventFacebook(eventData);
        this.getPatient()
        // this.service.setStep(1);
        this.router.navigate(['/patient/profile/location'])
        // this.user.ProfileStatus = 1;


        this.spinner.hide();

      })
    }



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
  }

  customValidator() {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value: string = control.value;

      if (!value) {
        return { 'required': true }; // Return required error if the field is empty
      } else if (!/^[a-zA-Z ]*$/.test(value)) {
        return { 'pattern': true }; // Return pattern error if non-English characters are entered
      } else if (value.split(' ').length < 3) {
        return { 'space': true }; // Return space error if the input does not contain three words
      }

      return null; // Return null if no error
    };
  }
  arabicThreeWordsValidator() {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value: string = control.value;

      if (!value) {
        return { 'required': true }; // Return required error if the field is empty
      } else if (!/[\u0600-\u06FF]/.test(value)) {
        return { 'pattern': true }; // Return pattern error if non-Arabic characters are entered
      } else if (value.split(' ').length < 3) {
        return { 'space': true }; // Return space error if the input does not contain three words
      }

      return null; // Return null if no error
    };
  }

}
