import { Component, Sanitizer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PatientService } from 'src/app/services/patient.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

  @Component({
  selector: 'app-salamtakcap',
  templateUrl: './salamtakcap.component.html',
  styleUrls: ['./salamtakcap.component.scss']
})
export class SalamtakcapComponent {
  id:any;
  public blogs: any[] = []
  showmore=false;
  btnText="Show More";
  scr:any="https://"
  url:any;

  storageUrl = environment.storageUrl;
  constructor(
    private spinner: NgxSpinnerService,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}
  transform(value: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

  getSafeUrl(url:string):SafeResourceUrl{
return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }

  ngOnInit(): void {
    debugger
    this.id = parseInt(this.route.snapshot.params['id']);
    this.getBlogs();
    self.addEventListener('fetch', (event:any) => {
      event.respondWith(async function() {
        // Use the navigation preload module if it's supported
        if (event.preloadResponse) {
          // Ensure that the preload response is settled before responding
          event.waitUntil(async function() {
            const preloadResponse = await event.preloadResponse;
            // You can perform additional tasks with preloadResponse if needed
          }());
          return event.preloadResponse;
        }

        // Your regular fetch handling logic goes here
        const response = await fetch(event.request);
        return response;
      }());
    });
  }

  getBlogs() {

    this.spinner.show()
    this.patientService.getBlogss(4).subscribe(res => {
      debugger;
      console.log(res['Data'])
      this.blogs = res['Data']
// this.blogs.forEach(element => {
//   element.image=
//   this.sanitizer.bypassSecurityTrustHtml
//       (element.image);
//   this.url =element.image;

// });
this.blogs.forEach(element => {
  this.url = this.getSafeUrl(element.image);
  console.log('url',this.url.changingThisBreaksApplicationSecurity)

});
      this.spinner.hide();
      console.log(this.blogs);
    })
  }
  showAllDesc(i)
  {
    if(this.showmore)
    this.btnText="Show More";
    else
    this.btnText="Show Less";
    this.showmore=!this.showmore;
  }


}
function Pipe(arg0: { name: string; }): (target: typeof SalamtakcapComponent) => void | typeof SalamtakcapComponent {
  throw new Error('Function not implemented.');
}

