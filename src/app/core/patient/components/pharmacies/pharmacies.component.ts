
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pharmacies',
  templateUrl: './pharmacies.component.html',
  styleUrls: ['./pharmacies.component.scss']
})
export class PharmaciesComponent {
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
  private HealthEntityPagedList = 5
  public filterObject :any;

  constructor(
    private service : PatientService,
    private spinner :NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getHealthEntityPagedList()
    this.getCities()
  }
  getHealthEntityPagedList(MaxResultCount = 10, SkipCount = 0,filters = false){
    this.loading = true
    var filter = {
      "MaxResultCount": MaxResultCount,
      "SkipCount": SkipCount,
      ...(this.CityId && {CityId: +this.CityId}),
      ...(this.areaId && {AreaId: +this.areaId}),
    }

    this.filterObject = filter
    this.spinner.show()
    this.service.getHealthEntityPagedList(this.HealthEntityPagedList,filter).pipe(map(res=>res['Data'])).subscribe(res=>{
      // this.doctors = [...this.doctors, ...res]
      this.data.TotalCount = res.TotalCount

      if(!filters){
        this.data.Items = [...this.data.Items, ...res.Items]
      }else{
        this.data.Items = res.Items
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
    this.service.getCitiesBycountryId(1).subscribe((res:any) => {
      debugger
      console.log(res.Data)
      this.cities = res.Data
    })
  }
  getAreasByCityId(cityId: any) {
    this.service.getAreas(cityId).subscribe((res:any) => {
      this.areas = res.Data
    })
  }
  convertToArabicNumber(input: any) {

    const lang = localStorage.getItem('lang');

    const arabicNumbers = ['۰', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    if (lang === 'ar')  {
      return input.replace(/\d/g, (match) => arabicNumbers[match]);

    }else{
      return input;
    }
  }
  converter(inp:any){
    const arabicNumbers = ['۰', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return inp.replace(/\d/g, (match) => arabicNumbers[match]);

  }

}
