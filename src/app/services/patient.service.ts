import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { COMPONENT_KEYWORDS } from '../component-keywords';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private selectedOffer: any;
  titleKey
  descriptionKey
  constructor(private http: HttpClient,    private titleService: Title,
    private metaService: Meta,
    private translocoService: TranslocoService) {}
  // home - Our Services
  getMedicalExaminationType() {
    return this.http.get<any>(`${environment.apiUrl}/LookUp/GetMedicalExaminationType`)
  }
  findDoctorsByFilters(form) {
    return this.http.post<any>(`${environment.apiUrl}/DoctorSearch/DoctorSearch`, form)
  }
  GetDoctorPolyClinic(ClinicId){
    return this.http.get(`${environment.apiUrl}/Doctor/GetDoctorByClinicId?ClinicId=${ClinicId}&IsApproved=${true}`)

  }
  getDoctorDetail(doctorId,MedicalExaminationTypeId,SchedualDate,ClinicId = null) {
    let url = `${environment.apiUrl}/Doctor/GetDoctorProfileByDoctorId?DoctorId=${doctorId}`
    // if(MedicalExaminationTypeId) { url += `&MedicalExaminationTypeId=${MedicalExaminationTypeId}` }
    // if(SchedualDate) { url += `&SchedualDate=${SchedualDate}` }
    // if(ClinicId) { url += `&ClinicId=${ClinicId}` }
    return this.http.get<any>(url)

    // return this.http.get<any>(`${environment.apiUrl}/Doctor/GetDoctorProfileByDoctorId?doctorId=${doctorId}&MedicalExaminationTypeId=${MedicalExaminationTypeId}&SchedualDate=${SchedualDate}&ClinicId=${ClinicId}`,)
  }
    GetDoctorVideos(DoctorID:any){
    return this.http.get(`${environment.apiUrl}/Doctor/GetDoctorVideos?DoctorID=${DoctorID}`)

  }
  getClinicGalleryByClinicId(ClinicId) {
    return this.http.get<any>(`${environment.apiUrl}/DoctorClinic/GetClinicGalleryByClinicId?ClinicId=${ClinicId}`)
  }
  getSeniorityLevel() {
    return this.http.get<any>(`${environment.apiUrl}/SeniorityLevel/GetSeniorityLevel`)
  }
  getspecialist(){
    return this.http.get<any>(`${environment.apiUrl}/Specialist/GetSpecialist`)
  }
  getClinicSchedualByClinicDayId(ClinicId,DayId,MedicalExaminationTypeId,BookDate) {
    return this.http.get<any>(`${environment.apiUrl}/DoctorClinic/GetClinicSchedualByClinicDayId?ClinicId=${ClinicId}&DayId=${DayId}&MedicalExaminationTypeId=${MedicalExaminationTypeId}&BookDate=${BookDate}`)
  }
  getSchedualByClinicIdPolyClinic(ClinicId,DoctorID,DayId,MedicalExaminationTypeId,BookDate ){
    debugger
    return this.http.get(`${environment.apiUrl}/DoctorClinic/GetPolyClinicSchedualByClinicDayId?ClinicId=${ClinicId}&DoctorID=${DoctorID}&DayId=${DayId}&MedicalExaminationTypeId=${MedicalExaminationTypeId}&BookDate=${BookDate}`);
  }

  createPatientappointment(form) {
    return this.http.post<any>(`${environment.apiUrl}/Patient/CreatePatientAppointment`, form)
  }

  editPatientappointment(AppointmentId:any,DoctorWorkingDayTimeId:any,AppointmentDate:any) {
    return this.http.get<any>(`${environment.apiUrl}/PatientAppointment/EditPatientAppointment?AppointmentId=${AppointmentId}&DoctorWorkingDayTimeId=${DoctorWorkingDayTimeId}&AppointmentDate=${AppointmentDate}`)
  }
  // POST ​/api​/{culture}​/Doctor​/GetPopularDoctors
  getPopularDoctors() {
    return this.http.post<any>(`${environment.apiUrl}/Doctor/GetPopularDoctors`,{})
  }
  // GET /api​/{culture}​/LookUp​/GetDoctorHealthTopics
  getDoctorHealthTopics() {
    return this.http.get<any>(`${environment.apiUrl}/LookUp/GetDoctorHealthTopics`)
  }
  // GET /api​/{culture}​/Ads​/GetWhatsAppAds
  getWhatsAppAds() {
    return this.http.get<any>(`${environment.apiUrl}/Ads/GetWhatsAppAds?DoctorApp=false`)
  }

  // GET /api​/{culture}​/PatientAppointment​/GetPatientAppointmentes
  getPatientAppointmentes() {
    return this.http.get<any>(`${environment.apiUrl}/PatientAppointment/GetPatientAppointmentes`)
  }

  getUpcomingAppointmentes() {
    return this.http.get<any>(`${environment.apiUrl}/PatientAppointment/GetUpcomingAppointmentes`)
  }
  getMedicalHistoryAppointmentes() {
    return this.http.get<any>(`${environment.apiUrl}/PatientAppointment/GetMedicalHistoryAppointmentes`)
  }
  getCanceledAppointmentes() {
    return this.http.get<any>(`${environment.apiUrl}/PatientAppointment/GetCanceledAppointmentes`)
  }

  // GET ​/api​/{culture}​/DoctorAppointment​/CancelAppointment | AppointmentId & CancelReason
  cancelAppointment(AppointmentId,CancelReason = 'No Reason') {
    return this.http.get<any>(`${environment.apiUrl}/PatientAppointment/CancelPatientAppointment?AppointmentId=${AppointmentId}&CancelReason=${CancelReason}`)
  }
  GET
   // (/api/culture/DoctorRate/GetDoctorRateByDoctorIdPagedList)
  getDoctorRateByDoctorIdPagedList(DoctorId,PageNumber,PageSize) {
    return this.http.get<any>(`${environment.apiUrl}/DoctorRate/GetDoctorRateByDoctorIdPagedList?DoctorId=${DoctorId}&PageNumber=${PageNumber}&PageSize=${PageSize}`)
  }
  // POST  ​/api​/{culture}​/DoctorRate​/CreateDoctorRate
//   {
//   "DoctorId": 0,
//   "Rate": 5,
//   "Comment": "string"
// }
  createDoctorRate(form) {
    return this.http.post<any>(`${environment.apiUrl}/DoctorRate/CreateDoctorRate`, form)
  }
  // ​/api​/{culture}​/Ads​/GetBlogs
  getBlogs() {
    // Api/en/lookup/getBlogs
    return this.http.get<any>(`${environment.apiUrl}/lookup/GetBlogs`)
  }
  getOffers(){
    return this.http.get<any>(`${environment.apiUrl}/Offers/GetActiveOffers`)
  }
  gerOffersByCategory(id:any){
    return this.http.get(`${environment.apiUrl}/Offers/GetActiveOffersDetails?OfferCategoryID=${id}`)

  }
  // POST ​/api​/{culture}​/LookUp​/CreateContactUs
  createContactUs(form) {
    return this.http.post<any>(`${environment.apiUrl}/LookUp/CreateContactUs`, form)
  }
  // GET ​/api​/{culture}​/PatientLookUp​/GetMedicineAllergy
  getMedicineAllergy() {
    return this.http.get<any>(`${environment.apiUrl}/PatientLookUp/GetMedicineAllergy`)
  }

  // GET  ​/api​/{culture}​/PatientLookUp​/GetFoodAllergy
  getFoodAllergy() {
    return this.http.get<any>(`${environment.apiUrl}/PatientLookUp/GetFoodAllergy`)
  }
  // GET  ​/api​/{culture}​/HealthEntity​/GetHealthEntityPagedList
  getHealthEntityPagedList(HealthEntityTypeId,prams) {
    var url = `${environment.apiUrl}/HealthEntity/GetFilteredPolyClinics2`
    for (const key in prams) {
      if (Object.prototype.hasOwnProperty.call(prams, key)) {
        const element = prams[key];
        url += `&${key}=${element}`
      }
    }
    return this.http.get<any>(url)
  }
  getCities() {
    return this.http.get(`${environment.apiUrl}/City/GetAllCities`)
  }
  getAreas(cityId: any) {
    return this.http.get(`${environment.apiUrl}/Area/GetAreasByCityId?cityId=${cityId}`)
  }
  getBlogss(id:any) {
    // Api/en/lookup/getBlogs
    return this.http.get<any>(`${environment.apiUrl}/lookup/GetBlogs?salamtakGateEnum=${id}`)
  }
  getCitiesBycountryId(countryId:any) {
    return this.http.get(`${environment.apiUrl}/City/GetCities?CountryId=${countryId}`)
  }
  getPatientEmrDetails(appointmentId: any) {
    return this.http.get(`${environment.apiUrl}/Patient/GetPatientEmrDetails?appointmentId=${appointmentId}`)
  }
  getOfferDetailsByOfferId(offerId: any) {
    return this.http.get(`${environment.apiUrl}/Offers/GetActiveOffersByOfferID?OfferID=${offerId}`)
  }

  //forOffer
  getSelectedOffer(): any {
    return this.selectedOffer;
  }

  setSelectedOffer(offer: any): void {
    this.selectedOffer = offer;
  }

  setDefaultMetaTags() {
    const lang = localStorage.getItem('lang');

    debugger
    if (lang) {
      if (lang === 'ar') {
this.titleKey=' سلامتك | احجز الأن كشف أون لاين أو في عيادة عن طريق تطبيق سلامتك واحصل علي استشارة طبية موثوقة مع نخبة من أطباء سلامتك ';
this.descriptionKey='احجز دكتور الان مع أحد نخبة اطباء سلامتك  في العيادة أو أون لاين بكل سهولة وأمان مع سلامتك. قم بالحجز السريع لاستشارة طبية في العيادة او استشارة طبية اون لاين  مع أطباء متخصصين في مختلف التخصصات وعيادات مثل طب النساء والتوليد، الجلدية، التجميل، العيون، العلاج الطبيعي، طب الأطفال، الباطنة، العظام، وطب الأسنان. استفد من خدمة الحجز الطبي الآمنة والموثوقة للحصول على الرعاية الصحية التي تحتاجها بسهولة ويسر.  '
     }
     else {
       this.titleKey='Salamtak Group | reserve your doctor appointment, home visits doctors or online visit.'
       this.descriptionKey='With Salamtak Group, you can reserve your home visits doctors, clinic appointments, or clinic visit in all medical specialties online.    (for online url) Salamtak group is a medical care application that provides you with an online reservation to the nearest doctor clinic, in all medical specialties, along with a free online medical advice and online doctor consultation through Salamtak teleservices(Video call, and call).'
     }

   }

    const defaultKeywords =  COMPONENT_KEYWORDS.defaultKeywords.join(', ');;
    this.updateMetaTags(this.titleKey, this.descriptionKey,defaultKeywords);
  }

  updateMetaTags(title: string, description: string, keywords: string) {
    try {
      // Translate title, description, and keywords if necessary
      const translatedTitle = this.translocoService.translate(title);
      const translatedDescription = this.translocoService.translate(description);
      const translatedKeywords = this.translocoService.translate(keywords);

      // Update meta tags with translated content
      this.titleService.setTitle(translatedTitle);
      this.metaService.updateTag({ name: 'description', content: translatedDescription });
      this.metaService.updateTag({ name: 'keywords', content: translatedKeywords });
    } catch (error) {
      console.error('Error updating meta tags:', error);
      // Handle error if translation fails or any other error occurs
    }
  }

  updateDynamicMetaTags(titleKey: string, descriptionKey: string, keywords: string) {
    // Fetch translated meta title and description for the current page
    const translatedTitle = this.translocoService.translate(titleKey);
    const translatedDescription = this.translocoService.translate(descriptionKey);

     this.titleService.setTitle(translatedTitle);
    this.metaService.updateTag({ name: 'description', content: translatedDescription });
    this.metaService.updateTag({ name: 'keywords', content: keywords });
  }

}
