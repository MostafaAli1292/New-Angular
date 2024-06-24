import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PatientService } from 'src/app/services/patient.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent {
  id:any;
  public blogs: any[] = []
  showmore=false;
  btnText="Show More";
  storageUrl = environment.storageUrl;
  constructor(
    private spinner: NgxSpinnerService,
    private patientService: PatientService,
    private route: ActivatedRoute,


  ) {}

  ngOnInit(): void {
    debugger
    this.id = parseInt(this.route.snapshot.params['id']);
    this.getBlogs();

  }

  getBlogs() {
    debugger
    this.spinner.show()
    this.patientService.getBlogss(5).subscribe(res => {
      console.log(res['Data'])
      this.blogs = res['Data']
      this.spinner.hide()
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
