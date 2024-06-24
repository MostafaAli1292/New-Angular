import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';
import { MarketingServiceService } from '../../Markting/MarketingService.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hidePassword = true;
    public submitted = false;
    showImage: boolean = true;

    public form:FormGroup = this.formbuilder.group({
      // email:['',[Validators.required,Validators.email]],
      // phone pattern
      phone:['',[Validators.required,Validators.pattern(/^[0-9]*$/),Validators.minLength(11),Validators.maxLength(11)] ],
      // phone max length 11
      // phone:['',[Validators.required,Validators.maxLength(11)]],
      password:['',Validators.required],
      rememberMe:[false,Validators.nullValidator],
    })

    constructor(private formbuilder:FormBuilder,
      private service:AuthenticationService,
      private spinner:NgxSpinnerService,
      private router: Router,
      private mktService:  MarketingServiceService,

      private route: ActivatedRoute,
      ) {
        timer(4000).subscribe(() => this.showImage = false);

      }

    get f() {return this.form.controls}
    submit(){
      this.submitted = true;
      if (this.form.invalid) {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        return
      }
      // alert(JSON.stringify({...this.form.value}))
      // {
      //   "Phone": "string",
      //   "Password": "string",
      //   "UserTypeId": 0,
      //   "FCM": "string"
      // }
      this.spinner.show()

      var form  = {
        Phone: this.form.value.phone,
        Password: this.form.value.password,
        UserTypeId: 3,
        // FCM: "string"
      }
      this.service.login(form).subscribe((res:any)=>{

        this.spinner.hide()
        const eventData: any = this.mktService.setEventData(
          'New Login By Patient',
          `Login`,
          "Login",
        );

        this.mktService.onEventFacebook(eventData);

        if(res.ProfileStatus == 0 || res.ProfileStatus == 1){
          // plase complete your profile
          Swal.fire({
            icon: 'warning',
            title: 'Please complete your profile',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['/patient/profile/personal-info'])
          })
         // return
        }
        console.log(res)
        this.router.navigate(['/patient/home'])


        // get redirect url from query parameters or default to home page
        // const redirectUrl = this.route.snapshot.queryParams['returnUrl'] ;
        // console.log(redirectUrl)
        // console.log(redirectUrl)
        // if(redirectUrl){
        //   this.router.navigate([redirectUrl])
        // }else{
        //   this.router.navigate(['/patient/home'])
        // }
        // this.router.navigate(['/patient/home'])

       setTimeout(() => {
        this.service.currentUserSubject.next(res)
        console.log('==================####=================')
        }, 5000);



      })
    }
    showHidePassword(){
      this.hidePassword = !this.hidePassword;
    }
}
