import { Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';
import { SearchFormService } from 'src/app/services/search-form.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchFormComponent {

  // public variables2 = [{ id: 0, name: 'One' }, { id: 1, name: 'Two' }];
  // public filteredList5 = this.variables2.slice();
  selectedSpecialtyControl = new FormControl('', this.requiredSelectValidator());

  name = ''
  // specialists
  public specialists :any
  public filteredSpecialists ;
  selectedSpecialty: any;
  // City
  public cities :any
  public filteredCities ;
  selectedCity: any;
  // Areas
  public areas :any
  public filteredAreas ;
  selectedArea: any;


requiredSelectValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    return value ? null : { 'required': true };
  };
}
  constructor(
    private service: SearchFormService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.service.getSpecialists().subscribe(res => {
      this.specialists = res;
      try {
        this.filteredSpecialists = this.specialists.slice();
      } catch (error) {}
    })
    this.service.getCities().subscribe(res => {
      this.cities = res;
      try {
        this.filteredCities = this.cities.slice();
      } catch (error) {}
    })
    this.service.getAreas().subscribe(res => {
      this.areas = res;
      try {
        this.filteredAreas = this.areas.slice();
      } catch (error) {}
    })

    this.service.getForm().subscribe(res => {
      if(res){

        try {
          this.name = res['DoctorName']
          this.selectedCity =  this.cities.filter(city => city.Id == res['CityId'])[0]
          this.selectedArea =  this.areas.filter(area => area.Id == res['AreaId'])[0]
          this.selectedSpecialty =  this.specialists.filter(specialty => specialty.Id == res['SpecialistId'])[0]

        } catch (error) {

        }
        // this.selectedCity = res['CityId']
        // this.selectedArea = res['AreaId']
        // this.getAreas(this.selectedCity)
      }
      // this.selectedSpecialty = res['SpecialistId ']
      // alert(this.selectedSpecialty)
    })
    // get query params
    this.route.queryParams.subscribe((params:any) => {
      console.log(params)
      console.log(params)
      console.log(params)
      console.log(params)
      try {
        this.name = params['DoctorName']
        this.selectedSpecialty =  this.specialists.filter(specialty => specialty.Id == params['SpecialistId'])[0]
        this.selectedCity =  this.cities.filter(city => city.Id == params['CityId'])[0]
        this.selectedArea =  this.areas.filter(area => area.Id == params['AreaId'])[0]
      } catch (error) {

      }

    });

    // console.log('==================####=================')
    // console.log(this.service.specialists)
    // this.specialists = this.service.specialists
    // console.log(this.specialists)
    // this.filteredSpecialists = this.specialists.slice();

    // this.cities = this.service.cities
    // this.filteredCities = this.cities.slice();
  }

  ngOnInit(): void {
    // this.getSpecialists()
    // this.getCities()
  }


  // getSpecialists() {
  //   this.service.getSpecialist().pipe(map(res => res['Data'])).subscribe(res => {
  //     this.specialists = res;
  //     this.filteredSpecialists = this.specialists.slice();
  //   })
  // }
  // getCities() {
  //   this.service.getCities().pipe(map(res => res['Data'])).subscribe(res => {
  //     this.cities = res;
  //     this.filteredCities = this.cities.slice();
  //   })
  // }
  getAreas(cityId) {
    this.areas = []
    this.filteredAreas = this.areas.slice();
    this.service.getPublicAreas(cityId)
  }
  search(){
    if (!this.selectedSpecialty) {
      // Show SweetAlert dialog if specialty is not selected
      Swal.fire({
        title: 'Error!',
        text: 'Please select a specialty.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return
    } else {

    }
    if(this.selectedSpecialty == undefined && this.selectedCity == undefined && this.selectedArea == undefined && this.name == ''){
      this.router.navigate(['/patient/find-a-doctor'])
      return
    }
    var form :any;
if(this.selectedCity==undefined)
{
    form = {

    ...(this.name != '' && this.name != undefined ) && {DoctorName: this.name},
    ...(this.selectedSpecialty != undefined) && {SpecialistId: Number(this.selectedSpecialty.Id)},
    ...  {CityId:1},
    ...(this.selectedArea != undefined) && {AreaId: Number(this.selectedArea.Id)},

    // AvalibleDate :
  }
}
else{
      form = {

      ...(this.name != '' && this.name != undefined ) && {DoctorName: this.name},
      ...(this.selectedSpecialty != undefined) && {SpecialistId: Number(this.selectedSpecialty.Id)},
      ...(this.selectedCity != undefined) && {CityId: Number(this.selectedCity.Id)},
      ...(this.selectedArea != undefined) && {AreaId: Number(this.selectedArea.Id)},

      // AvalibleDate :
    }
  }
    // get all params from url
    this.route.queryParams.subscribe((params:any) => {
      // if params not exist in form add it
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          const element = params[key];
          if(!form.hasOwnProperty(key)){
            form[key] = element
          }
        }
      }
    });
    console.log(form)
    this.service.setForm(form)
    this.router.navigate(['/patient/find-a-doctor'], { queryParams: form });


  }

}
