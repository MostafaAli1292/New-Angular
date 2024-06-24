import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PatientService } from 'src/app/services/patient.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-scope',
  templateUrl: './scope.component.html',
  styleUrls: ['./scope.component.scss']
})
export class ScopeComponent {
  id:any
  showmore=false;
  btnText="Show More";
  public blogs: any[] = []
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
    this.patientService.getBlogss(2).subscribe(res => {
      console.log(res['Data'])
      this.blogs = res['Data']
      this.spinner.hide()
    })
  }

  showAllDesc()
  {
    if(this.showmore)
    this.btnText="Show More";
    else
    this.btnText="Show Less";
    this.showmore=!this.showmore;
  }

}
