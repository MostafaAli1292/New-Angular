import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
    public submitted = false;
    public form:FormGroup = this.formbuilder.group({
      email_or_phone:['',[Validators.required]],
      // email or phone validation pattern regexz
    })

    constructor(private formbuilder:FormBuilder,private router: Router,
      private auth:AuthenticationService,
      private spinner:NgxSpinnerService
      ) { }

    get f() {return this.form.controls}
    submit(){
      this.submitted = true;
      if (this.form.invalid) {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        return
      }
      // alert(JSON.stringify({...this.form.value}))


      // Check if email registered then sent 4 random code reset Method 1 = Email 2 = Phone

      // Check if email_or_phone is email or phone number
      var form
      if(this.form.value.email_or_phone.includes('@')){
        // Email
         form = {
          ResetMethod: 1,
          Email: this.form.value.email_or_phone,
          UserTypeId: 3
        }
      }else{
        // Phone
        form = {
          ResetMethod: 2,
          Phone: this.form.value.email_or_phone,
          UserTypeId: 3
        }
      }





      this.spinner.show()
      this.auth.ResetPassword(form).subscribe((res:any)=>{
        sessionStorage.setItem('reset-password-user-id',res['Data']['UserId'])
        this.spinner.hide()

        // back end issue !
        sessionStorage.setItem('auth-verification-code',res['Data']['Code'])

        this.router.navigate(['/auth/verification-code'],
        {
          queryParams: {
            r:btoa(unescape(encodeURIComponent(JSON.stringify(res.Data)))),
            // c : res['Data']['Code'],
            p : this.form.value.email_or_phone,
            from : 'forgot-password'
          }
        })

      })
      // this.router.navigate(['/auth/verification-code', this.form.value.email])

    }
}
