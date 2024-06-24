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
  selector: 'app-askeslist',
  templateUrl: './askeslist.component.html',
  styleUrls: ['./askeslist.component.scss']
})
export class AskeslistComponent {

  public user
  askes:any=[]



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

   });
   this.spinner.show()


}

  ngOnInit(): void{
  this.service.getQandAQuestien().subscribe((res:any)=>{
    debugger
    console.log(res)
    this.askes=res.Data
    this.spinner.hide()
  })
}
}
