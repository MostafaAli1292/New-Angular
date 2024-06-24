import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { CountryISO } from 'ngx-intl-tel-input';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-askes',
  templateUrl: './askes.component.html',
  styleUrls: ['./askes.component.scss']
})
export class AskesComponent {
  public Specialist :any = {
    Data : [],
    Filtered : [],
    Selected : null
  }
  edit = false
  profileData :any = null
  public user
  public formSubmitted = false;


  // form validation
  public submitted = false;
  public form:FormGroup = this.formbuilder.group({
    SpecialistID:['',Validators.required],
    Question:['',Validators.required],
    QDetails:['',Validators.required],
    GenderID:['',Validators.required],
    IsForMe:['',Validators.required],
    Age:['',Validators.required],
    // bioAr : ['',[Validators.required,Validators.pattern(/[\u0600-\u06FF]/)]],
  });


  constructor( private service : AuthenticationService,
     private formbuilder:FormBuilder,
    private spinner:NgxSpinnerService,
    private route: ActivatedRoute,
    private router:Router,
    private authentication: AuthenticationService,
    private translocoService: TranslocoService
  ) {
    this.authentication.currentUser.subscribe(currentUserSubject => this.user = currentUserSubject)
    this.route.queryParams.subscribe(params => {
      if(params['Mode'] == 'Edit'){
        this.edit = true;
      }
    });
    this.spinner.show()


}

getSpecialist(){
  debugger
  this.spinner.show()
  this.service.getSpecialist().subscribe(res=>{
    this.Specialist.Data = res['Data']
    this.Specialist.Filtered = res['Data']
    this.spinner.hide()
  })
}
ngOnInit(): void {
  debugger
this.getSpecialist()
}

get f() {return this.form.controls}

formSubmit(){
{
  debugger
  this.formSubmitted = true;
  if (this.form.invalid) {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    return
  }


  var form :any= {
    SpecialistID : (this.form.value.SpecialistID.Id),
    Question : (this.form.value.Question),
    GenderID :  (this.form.value.GenderID),
    QDetails : this.form.value.QDetails,
    IsForMe :  (this.form.value.IsForMe),
    Age :  (this.form.value.Age),


  }

  console.log(form)
  this.spinner.show()
  this.service.CreateQandAForPatient(form).subscribe((res:any)=>{
    console.log(res)
    this.spinner.hide()
    Swal.fire({
      title: this.translocoService.translate('form.input.ask.done'),
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.translocoService.translate('swal.Soon.ConfirmButtonText'),
      timer:4000,


    }).then((result) => {

      this.router.navigate(['/patient/home'])

      })

  })
}

}
setGenderValueToForm(Gender:String){
  this.form.controls['gender'].setValue(Gender);
}
}
