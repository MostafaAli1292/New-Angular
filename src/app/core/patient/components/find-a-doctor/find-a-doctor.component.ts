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
  selector: 'app-find-a-doctor',
  templateUrl: './find-a-doctor.component.html',
  styleUrls: ['./find-a-doctor.component.scss']
})
export class FindADoctorComponent {
  private params : any
  titleKey
  descriptionKey
  data :any ;
  available:any;
  public doctors : any = [];
  public filterObject :any;
  loading = false
  storageUrl = environment.storageUrl;
  genders = [
    {id: 1, name: 'male'},
    {id: 2, name: 'female'},
  ]
  seniorityLevels = []
  specialists=[]
  services = []
  todayDate:any = new Date();
  minDate:Date = new Date();
  FeesFrom
  FeesTo
  public doctorViewerOptions: any = {
    navbar: false,
    toolbar: false,
    title: false,
    movable: false,
  };
  constructor(
    private service : PatientService,
    private form : SearchFormService,
    private route: ActivatedRoute,
    private mktService:  MarketingServiceService,
    private translocoService: TranslocoService,
    private spinner :NgxSpinnerService,
    private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.params = params
      this.doctors = []
      this.filter(10,0)
    })
    const currentdate= new Date();
    const year = currentdate.getFullYear()
    const month = this.padZero(currentdate.getMonth()+1);
    const day = this.padZero(currentdate.getDate())
    this.available=`${year}-${month}-${day}`
  }
  private padZero(value:number):string{
    return value< 10 ? `0${value}` :`${value}`
  }
  ngOnInit(): void {
    debugger
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
    const keywords = COMPONENT_KEYWORDS.FindComponent.join(', '); // Get keywords for HomeComponent
    // this.service.updateMetaTags(this.translocoService.translate('form.input.titles.find-title'), this.translocoService.translate('form.input.titles.find-description') ,keywords);

    this.service.updateDynamicMetaTags(this.titleKey, this.descriptionKey, keywords);

    this.getSeniorityLevel()
    this.getspecialist()
    this.getMedicalExaminationType()
    // this.setParam('AvalibleDate',new Date().toISOString().split('T')[0])
   sessionStorage.setItem  ('FeesFrom',"0");
    // if params not contain AvalibleDate
    debugger
    if(!this.params['AvalibleDate']){
      this.setParam('AvalibleDate',new Date().toISOString().split('T')[0])
    }else{
      // this.todayDate = new Date(this.params['AvalibleDate'])
      this.todayDate = new Date().toISOString().split('T')[0]

    }
  }

  filter(MaxResultCount = 10, SkipCount = 0){
    debugger
    this.loading = true;
    var FeesFrom :any= sessionStorage.getItem  ('FeesFrom');
    var cty=1;
if(!FeesFrom)
FeesFrom=0;
if(this.params['CityId'])
cty=this.params['CityId'];
    var filter = {
      "MaxResultCount": MaxResultCount,
      //  this.filterObject?.SkipCount + 10
      "SkipCount": SkipCount,
      ...(this.params['DoctorName'] && {DoctorName: this.params['DoctorName']}),
      ... ( {CityId: +cty}),
      ...(this.params['SpecialistId'] && {SpecialistId: +this.params['SpecialistId']}),
      ...(this.params['AreaId'] && {AreaId: +this.params['AreaId']}),
      ...(this.params['MedicalExaminationTypeId'] && {MedicalExaminationTypeId: +this.params['MedicalExaminationTypeId']}),
      ...(this.params['GenderId'] && {GenderId: +this.params['GenderId']}),
      ...(this.params['SeniortyLevelId'] && {SeniortyLevelId: +this.params['SeniortyLevelId']}),
      // .toISOString().split('T')[0]
      ...(this.params['AvalibleDate'] && { AvalibleDate: (this.params['AvalibleDate']) }),
      ...( {FeesFrom: +FeesFrom}),
      ...(this.params['FeesTo'] && {FeesTo: +this.params['FeesTo']}),
    }

    this.filterObject = filter
    this.spinner.show()
    this.service.findDoctorsByFilters(filter).pipe(map(res=>res['Data']['Items'])).subscribe(res=>{
      const eventData: any = this.mktService.setEventData(
        'Patient Search for doctor',
        `Search for a Doctor`,
        " ",
      );

      this.mktService.onEventFacebook(eventData);

      this.doctors = [...this.doctors, ...res]
      // setTimeout(() => {
      //   this.loading = false
      // }, 10000);
      this.spinner.hide()
    })
  }
  getSeniorityLevel(){
    return this.service.getSeniorityLevel().pipe(map(res=>res['Data'])).subscribe(res=>{
      this.seniorityLevels = res
    })
  }
  getspecialist(){
    return this.service.getspecialist().pipe(map(res=>res['Data'])).subscribe(res=>{
      this.specialists = res
    })
  }
  getMedicalExaminationType(){
    this.service.getMedicalExaminationType().pipe(map(res=>res['Data'])).subscribe(res => {
      console.log(res);
      this.services = res;
    })
  }
  // appendParam(key, value){
  //   var url = new URL(window.location.href);
  //     url.searchParams.set(key, value);
  //     window.history.pushState({}, '', url.href);
  // }
  setParam(key, value){
    this.router.navigate(['/patient/find-a-doctor']);
  }
  selectGender(event,id){
    if(event.target.checked){
      this.setParam('GenderId',id)
    }
  }
  selectSeiority(event,id){
    if(event.target.checked){
      this.setParam('SeniortyLevelId',id)
    }
  }
  selectspeciality(event,id){
    if(event.target.checked){
      this.setParam('SpecialistId',id)
    }
  }
  selectService(event,id){
    if(event.target.checked){
      this.setParam('MedicalExaminationTypeId',id)
    }
  }
  selectPrice(from,to){
debugger
    if(from && to){
      if(from > to) return
      this.setParam('FeesFrom',from)
      sessionStorage.setItem('FeesFrom',from);
      this.setParam('FeesTo',to)
      this.filter()
    }
    if(from){
      if(from < 0) return
      this.setParam('FeesFrom',from)
      this.filter()
    }
    if(to){
      if(to < 0) return
      this.setParam('FeesTo',to)
      this.filter()
    }

    return
    if(from && to){
      if(from > to) return
    }

    if(from){
      if(from < 0) return
      this.setParam('FeesFrom',from)
    }
    if(to){
      if(to < 0) return
      this.setParam('FeesTo',to)
    }
    this.filter()
  }
  dateChange(event){
    debugger
    var value = event.target._elementRef.nativeElement.value
    var result = new Date(value);
    result.setDate(new Date(value).getDate() );
    var d= result.getDate();
    var m=result.getMonth()+1;
    var mon=m.toString().length===1?'0'+m:m;
    var day=d.toString().length===1?'0'+d:d;
    var y = result.getFullYear();
    var AppDate=y+"-"+mon+"-"+day;
    const iosDate = new Date(result).toISOString().split('T')[0];
    var cut = iosDate.substring(0, iosDate.length - 0);
    console.clear()
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
    console.log(cut)
    this.setParam('AvalibleDate',AppDate)
  }
  bookFor(event,doctor){
    debugger
    event.preventDefault()
    const eventData: any = this.mktService.setEventData(
      'Patient Booked Doctor Appointment',
      `View Doctor Profile`,
      " ",
    );

    this.mktService.onEventFacebook(eventData);
    this.router.navigate(['/patient/doctor-profile',doctor.DoctorId], { queryParams: {
      DoctorId : doctor.DoctorId,
      ClinicId : doctor.clinicDto.ClinicId,
      AvalibleDate : this.params['AvalibleDate']
    } }).then(res=>{
      // MedicalExamationTypes not found for {Doctor/GetDoctorProfileByDoctorId} api so i save it in localstorage  to use it in doctor-profile component
      localStorage.setItem('doctor',JSON.stringify(doctor))
      sessionStorage.setItem  ('DoctorFees',doctor.FeesFrom);

    })
  }
  // @HostListener("window:scroll", ["$event"])
  // onWindowScroll() {
  //   // if page is scrolled to bottom
  //   if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 300) {

  //     if(this.doctors.length < this.filterObject.MaxResultCount) return
  //     this.filter(this.filterObject.MaxResultCount + 10,this.filterObject?.SkipCount + 10)
  //     console.log('scrolled')
  //   }

  // }
}
