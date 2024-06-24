import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { COMPONENT_KEYWORDS } from '../COMPONENT_KEYWORDS';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {
  titleKey:any
 descriptionKey:any
constructor( private titleService: Title,
  private metaService: Meta) { }


  setDefaultMetaTags() {
 
  
 
this.titleKey=
this.descriptionKey='احجز دكتور الان مع أحد نخبة اطباء سلامتك  في العيادة أو أون لاين بكل سهولة وأمان مع سلامتك. قم بالحجز السريع لاستشارة طبية في العيادة او استشارة طبية اون لاين  مع أطباء متخصصين في مختلف التخصصات وعيادات مثل طب النساء والتوليد، الجلدية، التجميل، العيون، العلاج الطبيعي، طب الأطفال، الباطنة، العظام، وطب الأسنان. استفد من خدمة الحجز الطبي الآمنة والموثوقة للحصول على الرعاية الصحية التي تحتاجها بسهولة ويسر.  '
   

 

    }

 
    updateDynamicMetaTags(titleKey: string, descriptionKey: string, keywords: string) {
      // Fetch translated meta title and description for the current page
      const translatedTitle = ' سلامتك | احجز الأن كشف أون لاين أو في عيادة عن طريق تطبيق سلامتك واحصل علي استشارة طبية موثوقة مع نخبة من أطباء سلامتك ';
      const translatedDescription = 'احجز دكتور الان مع أحد نخبة اطباء سلامتك  في العيادة أو أون لاين بكل سهولة وأمان مع سلامتك. قم بالحجز السريع لاستشارة طبية في العيادة او استشارة طبية اون لاين  مع أطباء متخصصين في مختلف التخصصات وعيادات مثل طب النساء والتوليد، الجلدية، التجميل، العيون، العلاج الطبيعي، طب الأطفال، الباطنة، العظام، وطب الأسنان. استفد من خدمة الحجز الطبي الآمنة والموثوقة للحصول على الرعاية الصحية التي تحتاجها بسهولة ويسر.  '
  
       this.titleService.setTitle(translatedTitle);
      this.metaService.updateTag({ name: 'description', content: translatedDescription });
      this.metaService.updateTag({ name: 'keywords', content: keywords });
    }
 

}
