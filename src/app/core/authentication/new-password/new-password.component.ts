import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent {
  hidePassword = true;
    public submitted = false;
    public form:FormGroup = this.formbuilder.group({
      password:['',Validators.required, Validators.minLength(6)],
      confirmPassword:['',Validators.required],
    })

    constructor(private formbuilder:FormBuilder,private router: Router,
      private service:AuthenticationService,
      private spinner:NgxSpinnerService
      ) { }

    get f() {return this.form.controls}
    submit(){
      debugger
      this.submitted = true;
      if (this.form.invalid) {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        return
      }
      if(this.form.value.password != this.form.value.confirmPassword){
        // alert('Password and confirm password not matched')
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Password and confirm password not matched',
          // footer: '<a href>Why do I have this issue?</a>'
        })
        return
      }

      const form = {
        UserId : Number(sessionStorage.getItem('reset-password-user-id')),
        Password : this.form.value.password,
        OldPassword : ''
      }
      this.spinner.show()
      this.service.updatePassword(form).subscribe(res=>{
        console.log(res)
        this.spinner.hide()
        this.router.navigate(['/auth/reset-successfully'])
      })

    }
    showHidePassword(){
      this.hidePassword = !this.hidePassword;
    }
}
