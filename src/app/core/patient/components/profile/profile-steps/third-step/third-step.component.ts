import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryISO } from 'ngx-intl-tel-input';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs';
import { MarketingServiceService } from 'src/app/core/Markting/MarketingService.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.component.html',
  styleUrls: ['./third-step.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class ThirdStepComponent {
  public patient
  // public countries
  // public cities
  bloodTypes
  MedicineAllergy :any= []
  FoodAllergy :any= []
  public user

  // areas
  public formSubmitted = false;
  public form:any = this.formbuilder.group({



//     Height*	integer($int32)
// Weight*	integer($int32)
// Pressure*	string
// SugarLevel*	string
// BloodTypeId*	integer($int3
    Height : [''],
    Weight : [''],
    Pressure : [''],
    SugarLevel : [''],
    BloodTypeId : [''],


    OtherAllergies : ['',Validators.nullValidator],
    MedicalAllergies : ['',Validators.nullValidator],
    FoodAllergies : ['',Validators.nullValidator],
    Prescriptions : ['',Validators.nullValidator],
    CurrentMedication : ['',Validators.nullValidator],
    PastMedication : ['',Validators.nullValidator],
    Injuries : ['',Validators.nullValidator],
    ChronicDiseases : ['',Validators.nullValidator],
    Surgeries : ['',Validators.nullValidator],
  });
  selectedMedicineAllergy :any
  selectedFoodAllergy :any
  constructor(
    private formbuilder:FormBuilder,
    private route:ActivatedRoute,
    private service : AuthenticationService,
    private spinner:NgxSpinnerService,
    private router:Router,
    private mktService:  MarketingServiceService,

    private patientService:PatientService
    ) {       this.service.currentUser.subscribe(currentUserSubject => this.user = currentUserSubject)
      console.log(this.user)}

  ngOnInit(): void {
    this.getBloodTypes();
    // get prams from url
    this.route.queryParams.subscribe((params:any) => {
      if(params.redirect){
        // const form :any = sessionStorage.getItem('sign-up-first-step');
        // console.log(JSON.parse(form));
        // this.form.patchValue(JSON.parse(form));
        // this.getCountries()
        // this.getOccupations();
        // this.getCities();

      }else{
        // this.getCountries()
      // this.getCities();

        // this.getOccupations();
      }
    })

  }
  getFoodAllergy(){
    this.spinner.show();
    this.patientService.getFoodAllergy().pipe(map(res=>res['Data'])).subscribe((res:any)=>{
      console.clear()
      console.log(res)
      this.FoodAllergy = res;
      var arr :any = []
      this.patient.PatientFoodAllergiesDto.forEach((patientFoodAllergy:any) => {
        console.log(patientFoodAllergy)
        arr.push(patientFoodAllergy)
      })
      this.form.controls['FoodAllergies'].setValue(arr);


      // this.form.controls['FoodAllergies'].setValue(res);
      this.spinner.hide();

    }
    )

  }
  getMedicineAllergy(){
    this.spinner.show();
    this.patientService.getMedicineAllergy().pipe(map(res=>res['Data'])).subscribe((res:any)=>{
      this.MedicineAllergy = res;
      var arr :any = []
      this.patient.PatientMedicineAllergiesDto.forEach((patientMedicineAllergy:any) => {
          console.log(patientMedicineAllergy)
        arr.push(patientMedicineAllergy)
      });
      this.form.controls['MedicalAllergies'].setValue(arr);
      this.spinner.hide();
    }
    )

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
    this.service.GetPatientMedicalInfo().pipe(map(res=>res['Data'])).subscribe((patient:any)=>{
      console.log(patient);


        this.patient = patient;
     try {
      this.form.controls['Height'].setValue(patient.Height);
      this.form.controls['Weight'].setValue(patient.Weight);
      this.form.controls['Pressure'].setValue(patient.Pressure);
      this.form.controls['SugarLevel'].setValue(patient.SugarLevel);
      this.form.controls['OtherAllergies'].setValue(patient.OtherAllergies);
      this.form.controls['MedicalAllergies'].setValue(patient.MedicalAllergies);
      this.form.controls['FoodAllergies'].setValue(patient.FoodAllergies);
      this.form.controls['Prescriptions'].setValue(patient.Prescriptions);
      this.form.controls['CurrentMedication'].setValue(patient.CurrentMedication);
      this.form.controls['PastMedication'].setValue(patient.PastMedication);
      this.form.controls['Injuries'].setValue(patient.Iinjuries);
      this.form.controls['ChronicDiseases'].setValue(patient.ChronicDiseases);
      this.form.controls['Surgeries'].setValue(patient.Surgeries);
      this.form.controls['BloodTypeId'].setValue(patient.BloodTypeId);

      this.getMedicineAllergy();
      this.getFoodAllergy();
      // setTimeout(() => {


      //   // find object in array
      //   var BloodTypeId = this.bloodTypes.find((bloodType:any) => bloodType.Id == this.patient.BloodTypeId);
      //   this.setBloodTypeIdToForm(BloodTypeId)

      //   }, 200);

     } catch (error) {

     }

      // this form patch value

      // this.form.controls['Email'].setValue(patient.Email);


      // this.form.controls['Address'].setValue(patient.Address);
      // set city id to form

      // set area id to form



      // this.form.controls['CityId'].setValue(patient.CityId);
      // this.form.controls['AreaId'].setValue(patient.AreaId);

      // this.getAreas(patient.CityId)
      // this.form.controls['BlockNo'].setValue(patient.BlockNo);
      // this.form.controls['FloorNo'].setValue(patient.FloorNo);
      // this.form.controls['ApartmentNo'].setValue(patient.ApartmentNo);
      // // this.form.controls['FullNameEn'].setValue(patient.FullNameEn);

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
      // BloodTypeId
      // get BloodTypeId object from countries array
      console.log(this.patient)
      console.log(this.patient)
      this.spinner.hide();
    })
  }
  getBloodTypes(){
    this.spinner.show();
    this.service.getBloodTypes().pipe(map(res=>res['Data'])).subscribe((res:any)=>{
      console.log(res)
      this.bloodTypes = res;

      this.spinner.hide();
      this.getPatient();

    })
  }
  // setGenderValueToForm(Gender:String){
  //   this.form.controls['gender'].setValue(Gender);
  // }


  setBloodTypeIdToForm(BloodTypeId:any){
    console.log(BloodTypeId)
    this.form.controls['BloodTypeId'].setValue(BloodTypeId);
  }
  // getCities(BloodTypeId:any = 1){
  //   // 1 for Egypt BloodTypeId default value
  //   this.spinner.show();
  //   this.service.getCities(BloodTypeId).pipe(map(res=>res['Data'])).subscribe((res:any)=>{
  //     console.log(res)
  //     this.cities = res;
  //     this.spinner.hide();
  //     if(this.patient){
  //       // this.cities.forEach((city:any) => {
  //       //   if(city.Id == this.patient.CityId){
  //       //     this.form.controls['CityId'].setValue(city);
  //       //   }
  //       // });
  //       this.getAreas(this.patient.CityId)
  //     }
  //   })
  // }
  // getAreas(CityId:any){
  //   this.spinner.show();
  //   this.service.getAreas(CityId).pipe(map(res=>res['Data'])).subscribe((res:any)=>{
  //     console.log(res)
  //     this.areas = res;
  //     this.spinner.hide();
  //     if(this.patient){
  //       this.areas.forEach((area:any) => {
  //         if(area.Id == this.patient.AreaId){
  //           this.form.controls['AreaId'].setValue(area);
  //         }
  //       });
  //     }
  //   })
  // }
  // setCityIdToForm(CityId:any){
  //   this.form.controls['CityId'].setValue(CityId);
  //   this.getAreas(CityId.Id)
  // }
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
    if (this.form.invalid) {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      return
    }
    debugger
    // alert(JSON.stringify({...this.form.value}))
    console.log(this.form.value)

    console.log('==================####=================')
    console.log(this.form.value  ,   this.patient?.Id)

    var form = {
      Id:this.patient.Id,
      Height: +this.form.value.Height,
      Weight: + this.form.value.Weight,
      Pressure:this.form.value.Pressure,
      SugarLevel:this.form.value.SugarLevel,
      BloodTypeId:this.form.value.BloodTypeId,
      OtherAllergies:this.form.value.OtherAllergies,
      Prescriptions:this.form.value.Prescriptions,
      CurrentMedication:this.form.value.CurrentMedication,
      PastMedication:this.form.value.PastMedication,
      ChronicDiseases:this.form.value.ChronicDiseases,
      Iinjuries:this.form.value.Injuries,
      Surgeries:this.form.value.Surgeries,

      PatientMedicineAllergiesDto : this.form.value.MedicalAllergies,

      PatientFoodAllergiesDto : this.form.value.FoodAllergies,
      // FoodAllergies : this.form.value.FoodAllergies,

      // "PatientMedicineAllergiesDto": [
      //   0
      // ],

      // PatientFoodAllergiesDto:this.form.value.PatientFoodAllergiesDto,
      // PatientMedicineAllergiesDto:this.form.value.PatientMedicineAllergiesDto,
    }
    var formcreate = {
       Height: +this.form.value.Height,
      Weight: + this.form.value.Weight,
      Pressure:this.form.value.Pressure,
      SugarLevel:this.form.value.SugarLevel,
      BloodTypeId:this.form.value.BloodTypeId,
      OtherAllergies:this.form.value.OtherAllergies,
      Prescriptions:this.form.value.Prescriptions,
      CurrentMedication:this.form.value.CurrentMedication,
      PastMedication:this.form.value.PastMedication,
      ChronicDiseases:this.form.value.ChronicDiseases,
      Iinjuries:this.form.value.Injuries,
      Surgeries:this.form.value.Surgeries,

      PatientMedicineAllergiesDto : this.form.value.MedicalAllergies,

      PatientFoodAllergiesDto : this.form.value.FoodAllergies,
      // FoodAllergies : this.form.value.FoodAllergies,

      // "PatientMedicineAllergiesDto": [
      //   0
      // ],

      // PatientFoodAllergiesDto:this.form.value.PatientFoodAllergiesDto,
      // PatientMedicineAllergiesDto:this.form.value.PatientMedicineAllergiesDto,
    }
    console.log( this.patient?.Id , form)
    this.spinner.show();

     if(this.user.ProfileStatus == 2){
      this.service.CreatePatientProfileThirdStep(formcreate).pipe(map(res=>res['Data'])).subscribe((res:any)=>{
        console.log(res);
        const eventData: any = this.mktService.setEventData(
          'Registration Third Step',
          `Signup Third Step`,
          "New Third Step",
        );

        this.mktService.onEventFacebook(eventData);

        this.spinner.hide();
        this.router.navigate(['/patient/succ'])

        // this.router.navigate(['/patient/home'])

        // this.router.navigate(['/patient/profile'])
      })
     }else{
      this.service.UpdatePatientProfileThirdStep(form).pipe(map(res=>res['Data'])).subscribe((res:any)=>{
        console.log(res)
        this.spinner.hide();
        // this.router.navigate(['/patient/home'])
        const eventData: any = this.mktService.setEventData(
          'Update Profile Third Step',
          `Signup Third Step`,
          "Update Third Step",
        );

        this.mktService.onEventFacebook(eventData);

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
      //   BloodTypeIdId : + this.form.value.BloodTypeId.Id,
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

      // this.router.navigate(['/patient/home'])
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
    // this.service.setStep(2);
    /*
    * 	 path => import { Router } from '@angular/router';
    * 	 param => private router: Router
    */
    this.router.navigate(['/patient/home'])
    this.router.navigate(['/patient/profile/succ'])


  }
  previousStep(){
    // this.service.setStep(0);
    /*
    * 	 path => import { Router } from '@angular/router';
    * 	 param => private router: Router
    */
    this.router.navigate(['/patient/profile/location'])

  }
}
