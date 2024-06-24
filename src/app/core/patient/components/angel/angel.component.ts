import { Component } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-angel',
  templateUrl: './angel.component.html',
  styleUrls: ['./angel.component.scss']
})
export class AngelComponent {
  public blogs: any[] = []
  storageUrl = environment.storageUrl;


  blog = [
    {



      icon: 'assets/icons/SalamtakCapN.png',
      title: 'Salamtak Cap',
      hex : '#fff',
      url:'/patient/SalamCap/4'

      // url:'/patient/SalamCap/1'


    },
    {
      icon: 'assets/icons/Salamtak Care NN.png',
      title: 'articals',
      hex : '#fff',
      url:'/patient/care/3'


    },
    // Pharmacies
    {


      icon: 'assets/icons/TrueorFN.png',
      title: 'True Or False',
      hex : '#fff',
      url:'/patient/true/1'



    },
    // Laboratories
    {
      icon: 'assets/icons/scoopN.png',
      title: 'scoop',
      hex : '#fff',
      url:'/patient/scope/2'



    },
    // Radiology Center
    {
      icon: 'assets/icons/Salamtak promotions N.png',
      title: 'Whats ',
      hex : '#fff',
      url:'/patient/pro/5'


    }

  ]

  constructor(
    private spinner: NgxSpinnerService,
    private patientService: PatientService,
    private router:Router,


  ) {}
  ngOnInit(): void {
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
  goto(){
    this.router.navigate(['/patient/emergency'])

  }
}
