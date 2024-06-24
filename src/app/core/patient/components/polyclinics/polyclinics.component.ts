import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-polyclinics',
  templateUrl: './polyclinics.component.html',
  styleUrls: ['./polyclinics.component.scss']
})
export class PolyclinicsComponent {
  data :any = {
    Items : [],
    // TotalCount : 0
  }
  cities :any = []
  CityId :any = null
  areas :any = []
  areaId :any = null
  loading = false
  storageUrl = environment.storageUrl;
  public doctorViewerOptions: any = {
    navbar: false,
    toolbar: false,
    title: false,
    movable: false,
  };
  private HealthEntityPagedList = 6
  public filterObject :any;

  constructor(
    private service : PatientService,
    private spinner :NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getHealthEntityPagedList()
    this.getCities()
  }
  getHealthEntityPagedList(filters = false){
    this.loading = true
    var filter = {
      ...(this.CityId && {CityId: +this.CityId}),
      ...(this.areaId && {AreaId: +this.areaId}),
    }

    this.filterObject = filter
    this.spinner.show()
    this.service.getHealthEntityPagedList(this.HealthEntityPagedList,filter).pipe(map(res=>res['Data'])).subscribe(res=>{
      // this.doctors = [...this.doctors, ...res]
      this.data = res

      if(!filters){
        this.data = [...this.data, ...res]
      }else{
        this.data = res
      }
      setTimeout(() => {
        this.loading = false
      }, 1000);
      this.spinner.hide()
    })
  }

  handleImageError(text = '',e:any){
    return e.target.src = `https://ui-avatars.com/api/?name=${text}&background=222161&color=fff`;
  }
  getCities() {
    this.service.getCities().subscribe((res:any) => {
      console.log(res.Data)
      this.cities = res.Data
    })
  }
  getAreasByCityId(cityId: any) {
    this.service.getAreas(cityId).subscribe((res:any) => {
      this.areas = res.Data
    })
  }
}
