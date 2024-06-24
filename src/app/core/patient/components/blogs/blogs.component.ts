import { Component } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { COMPONENT_KEYWORDS } from 'src/app/component-keywords';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent {
  public blogs: any[] = []
  storageUrl = environment.storageUrl;
  titleKey
  descriptionKey
  blog = [
    {



      id:4,
      icon: 'assets/icons/SalamtakCapN.png',
      title: 'SalamtakCapsola',
      hex : '#fff',
      url:'/patient/SalamtakCapsola'

      // url:'/patient/SalamCap/1'


    },
    {
      icon: 'assets/icons/Salamtak Care NN.png',
      title: 'SalamtakCare',
      hex : '#fff',
      url:'/patient/SalamtakCare'


    },
    // Pharmacies
    {


      icon: 'assets/icons/TrueorFN.png',
      title: 'SalamtakTrueOrFalse',
      hex : '#fff',
      url:'/patient/SalamtakTrueOrFalse'



    },
    // Laboratories
    {
      icon: 'assets/icons/scoopN.png',
      title: 'SalamtakScoop',
      hex : '#fff',
      url:'/patient/SalamtakScoop'



    },
    // Radiology Center
    {
      icon: 'assets/icons/Salamtak promotions N.png',
      title: 'SalamtakPromotions ',
      hex : '#fff',
      url:'/patient/SalamtakPromotions'


    },
    {
      icon: 'assets/icons/NSize/Angle.png',
      title: 'SalamtakAngel',
       hex : '#fff',
      url : '/patient/SalamtakAngel',
    }

  ]

  constructor(
    private spinner: NgxSpinnerService,
    private patientService: PatientService,
    private translocoService: TranslocoService,
    private service : PatientService,

  ) {}
  ngOnInit(): void {
    const lang = localStorage.getItem('lang');

    debugger
      if (lang) {
         if (lang === 'ar') {
          this.titleKey='سلامتك | بوابتك إلي كل ما تحتاجه من معلومات ونصائح طبية في مكان واحد. '
          this.descriptionKey='سلامتك. هو تطبيق يقدم كل ما تحتاجه من معلومات طبية عامة ونصائح طبية عملية تساعدك في الحفاظ على صحتك العامة وسلامتك. استفد من مقالات طبية متنوعة تغطي مختلف المواضيع الصحية والطبية، واحصل على المعلومات التي تحتاجها لتعزيز جودة حياتك وصحتك. اكتشف الأن  معلومات طبية شاملة ونصائح مفيدة لحياة صحية أفضل مع سلامتك.           '
          }
        else {
          this.titleKey='Salamtak Gate'
          this.descriptionKey='Salamtak Group is your gate to medical information, free meidcal advice, and online medical care.'
          }
      }
    const keywords = COMPONENT_KEYWORDS.SalamtakGate.join(', '); // Get keywords for HomeComponent
    this.service.updateDynamicMetaTags(this.titleKey, this.descriptionKey, keywords);
    this.getBlogs()
  }
  getBlogs() {
    this.spinner.show()
    this.patientService.getBlogs().subscribe(res => {
      console.log(res['Data'])
      this.blogs = res['Data']
      this.spinner.hide()
    })
  }

}
