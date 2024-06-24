
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchFormService {
  private specialists: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  public getSpecialists(): Observable<any> { return this.specialists.asObservable()}
  // public setRefresh(value: any): void { this.specialists.next(value) }

  private cities: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  public getCities(): Observable<any> { return this.cities.asObservable()}

  private areas: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  public getAreas(): Observable<any> { return this.areas.asObservable()}
  public setAreas(value: any): void { this.areas.next(value) }

  private form = new BehaviorSubject<any>(false);
  public getForm(): Observable<any> { return this.form.asObservable()}
  public setForm(value: any): void { this.form.next(value) }

  constructor(private http: HttpClient) {
      this.getPublicSpecialist()
      this.getPublicCities()
  }

  getPublicSpecialist() {
    return this.http.get<any>(`${environment.apiUrl}/Specialist/GetSpecialist`).subscribe(res => {
      this.specialists.next(res.Data)
    })
  }
  getPublicCities(CountryId = 1){
    return this.http.get<any>(`${environment.apiUrl}/City/GetCities?CountryId=${CountryId}`).subscribe(res => {
      this.cities.next(res.Data)
    })
  }
  getPublicAreas(cityId){
    console.log('==================####=================')
    console.log('==================####=================')
    console.log('==================####=================')
    return this.http.get<any>(`${environment.apiUrl}/Area/GetAreasByCityId?cityId=${cityId}`).subscribe(res => {
      this.areas.next(res.Data)
    }
    )

  }


}
