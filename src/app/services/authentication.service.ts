import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpInterceptor } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    public currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    private step: BehaviorSubject<Number> = new BehaviorSubject<Number>(0);
    public getStep(): Observable<Number> { return this.step.asObservable()}
    public setStep(value: Number): void { this.step.next(value) }


    // setRefreshToken(token: any) {
    constructor(private router: Router,private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')!));
      this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
      if(this.currentUserSubject.value != null) { return this.currentUserSubject.value }
    }

    login(form): Observable<any> {
      // https://salamtechapi.azurewebsites.net/api/en/User/Login
        return this.http.post<any>(`${environment.apiUrl}/User/Login`,form)
            .pipe(map(user => {
              console.log(user)
                if (user && user.Data.Token) {
                  console.clear()
                    localStorage.setItem('currentUser', JSON.stringify(user.Data));
                    this.currentUserSubject.next(user.Data);
                    console.log(user.Data)

                }
                return user.Data;
            }));
    }

    signup(form:any): Observable<any>{
      debugger
        var newForm = {
            Email: form.Email,
            Phone: 0 + form.Phone,
            Password: form.Password,
            Name: form.FullNameEn,
            NameAR:form.FullNameAr,
            UserTypeId: 3
        }

        return this.http.post<any>(`${environment.apiUrl}/User/Register`, newForm)
    }
    resend(form:any): Observable<any>{
      return this.http.post<any>(`${environment.apiUrl}/User/ResetPassword`, form)
    }
    createUser(form:any): Observable<any>{
      var newForm = {
          Email: form.Email,
          Phone: 0 + form.Phone,
          Password: form.Password,
          Name: form.FullNameEn,
          UserTypeId: 3
      }
      return this.http.post<any>(`${environment.apiUrl}/User/CreateUser`, newForm)
      .pipe( map((user:any) => {
        console.log(user)
         if (user && user.Data.Token) {
            // localStorage.setItem('currentWaitingUser', JSON.stringify(user.Data));
            localStorage.setItem('currentUser', JSON.stringify(user.Data));
            this.currentUserSubject.next(user.Data);
            // this.user.next(user.Data)
          }
         return user;
        })
     );


    //  return this.http.post(`${environment.apiUrl}/User/CreateUser`,newForm)
    //  .pipe(map((user:any) => {
    //    if (user && user.Data.Token) {
    //        console.log(user.data)
    //        var user = user.Data
    //         //  localStorage.setItem(`${environment.currentUser}`, JSON.stringify(user.data));
    //         //  this.currentUserSubject.next(user.data);
    //         localStorage.setItem('user', JSON.stringify(user));
    //         this.userSubject.next(user);

    //      } return user;
    //  })
    //  );

    }
    GetPatient(){
      return this.http.get(`${environment.apiUrl}/Patient/GetPatient`)
    }
    // GET /api​/{culture}​/Patient​/GetPatientMedicalInfo
    GetPatientMedicalInfo(){
      return this.http.get(`${environment.apiUrl}/Patient/GetPatientMedicalInfo`)
    }
    getCountries(){
        return this.http.get(`${environment.apiUrl}/LookUp/GetCountries`)
    }
    getSpecialist() {
      return this.http.get<any>(`${environment.apiUrl}/Specialist/GetSpecialist`)
    }
    // Occupation
    getOccupations(){
        return this.http.get(`${environment.apiUrl}/LookUp/GetOccupation`)
    }
    getCities(countryId : any){
        return this.http.get(`${environment.apiUrl}/City/GetCities?CountryId=${countryId}`)
    }
//     GET ​/api​/{culture}​/Area​/GetAreasByCityId
    getAreas(cityId : any){
      return this.http.get(`${environment.apiUrl}/Area/GetAreasByCityId?CityId=${cityId}`)
    }
    // GET /api​/{culture}​/PatientLookUp​/GetBloodTypes
    getBloodTypes(){
      return this.http.get(`${environment.apiUrl}/PatientLookUp/GetBloodTypes`)
    }
    CreatePatientProfileFirstStep(form:any){
      const formData:FormData = new FormData()
      formData.append('FullName',form.FullNameEn)
      formData.append('FullNameAr',form.FullNameAr)
      formData.append('OccupationId',form.OccupationId)
      formData.append('GenderId',form.GenderId)
      formData.append('Birthdate',form.Birthdate)
      formData.append('NationalityId',form.NationalityId)
      formData.append('profileImage',form.profileImage || null)
      return this.http.post(`${environment.apiUrl}/Patient/CreatePatientProfileFirstStep`,formData)

    }


      CreateQandAForPatient(form:any){
      const formData:FormData = new FormData()
      formData.append('SpecialistID',form.SpecialistID)
      formData.append('Question',form.Question)
      formData.append('QDetails',form.QDetails)
      formData.append('GenderID',form.GenderID)
      formData.append('IsForMe',form.IsForMe)
      formData.append('Age',form.Age)
      formData.append('Answer',form.Answer || null)
      return this.http.post(`${environment.apiUrl}/Patient/CreateQandAForPatient`,formData)

    }
    UpdatePatientProfileFirstStep(form:any){
      const formData:FormData = new FormData()
      formData.append('FullName',form.FullNameEn)
      formData.append('FullNameAr',form.FullNameAr)
      formData.append('OccupationId',form.OccupationId)
      formData.append('GenderId',form.GenderId)
      formData.append('Birthdate',form.Birthdate)
      formData.append('NationalityId',form.NationalityId)
      // formData.append('profileImage',form.profileImage || null)
      return this.http.post(`${environment.apiUrl}/Patient/UpdatePatientProfileFirstStep`,formData)
    }
    UpdatePatientProfileSecondStep(form:any){
      console.log(form)
      form = {
        CountryId : form?.CountryId?.Id || 1,
        FloorNo : +form.FloorNo || null,
        CityId : form.CityId.Id,
        AreaId : form.AreaId.Id,
        BlockNo :String( form.BlockNo) || null,
        ApartmentNo :String( form.ApartmentNo) || null,
        Address : form.Address,
      }
      return this.http.post(`${environment.apiUrl}/Patient/CreateAndUpdatePatientProfileSecondStep`,form)
    }
    UpdatePatientProfileThirdStep(form:any){
      console.log(form)
      return this.http.post(`${environment.apiUrl}/Patient/UpdatePatientMedicalInfo`,form)
    }
      updatePassword(form:any){
    return this.http.post(`${environment.apiUrl}/User/UpdatePassword`,form)
  }
    CreatePatientProfileThirdStep(form:any){
      console.log(form)
      return this.http.post(`${environment.apiUrl}/Patient/CreatePatientMedicallInfo`,form)
    }
    ResetPassword(form:any){
      return this.http.post(`${environment.apiUrl}/User/ResetPassword`,form)
    }
//     POST
// ​/api​/{culture}​/User​/UpdatePassword

    UpdatePassword(form:any){
      return this.http.post(`${environment.apiUrl}/User/ChangePassword`,form)
    }
    getQandAQuestien(){
      return this.http.get(`${environment.apiUrl}/Patient/GetAllQandAByPatientId`)
    }
    logout() {
      localStorage.removeItem('user');
      // this.userSubject.next(null);

        localStorage.removeItem(`${environment.localStorageUserKey}`);
        this.currentUserSubject.next(null);
        // this.user.next(null)
        this.router.navigate(['/auth/login'])
    }

    // checkPhone(countryCallingCode,nationalNumber ,type_id:any){
    //     return this.http.post<any>(`${environment.endPoint}/check-phone`, {phone : `+${countryCallingCode}${nationalNumber}` , type:type_id})
    // }

    // verifyCode(form){
    //     const formData:FormData = new FormData()
    //     for (const [key, value] of Object.entries(form)) {
    //      if(value!=null) {
    //         formData.append(key,`${value}`)
    //       }
    //     }
    //     return this.http.post(`${environment.endPoint}/verify-account`,formData);
    // }

    // resendCode(phone){
    //     const formData: FormData = new FormData();
    //     formData.append('phone', phone)
    //     return this.http.post(`${environment.endPoint}/resendCode`,formData);
    // }

    // forgetPassword(form){
    //     const formData: FormData = new FormData();
    //     formData.append('phone',form.phone)
    //     formData.append('code',form.code)
    //     return this.http.post(`${environment.endPoint}/forget-password`,formData);
    // }

    // resetPassword(form){
    //     const formData: FormData = new FormData();
    //     formData.append('phone',form.phone)
    //     formData.append('newPassword',form.newPassword)
    //     return this.http.post(`${environment.endPoint}/reset-password`,formData);
    // }

    // changePassword(form){
    //     const formData: FormData = new FormData();
    //     formData.append('oldPassword', form.oldPassword)
    //     formData.append('newPassword', form.newPassword)
    //     return this.http.post(`${environment.endPoint}/change-password`,formData);
    // }
}
