
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  hidePassword = true;
  userId:any
   public submitted = false;
   public form:FormGroup = this.formbuilder.group({
     oldPassword:['',Validators.required],
     password:['',Validators.required],
     confirmPassword:['',Validators.required], // password == confirmPassword

   }, { validator: MustMatch('password', 'confirmPassword') })


   constructor(private formbuilder:FormBuilder,private router: Router,
     private auth:AuthenticationService,
     private spinner:NgxSpinnerService
     ) { }
     ngOnInit() {
       debugger
       let currentUser = JSON.parse(localStorage.getItem(`${environment.localStorageUserKey}`)!);
       this.userId=currentUser.Id
     }
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
       UserId : this.userId,
       Password : this.form.value.password,
       OldPassword : ''
     }
     this.spinner.show()
     this.spinner.show()
     this.auth.UpdatePassword({...this.form.value}).subscribe((res:any)=>{
       console.log(res)
       this.spinner.hide()
       this.router.navigate(['/auth/reset-successfully']).then(()=>{
         this.auth.logout()
       }
       )

     })


     // this.router.navigate(['/auth/reset-successfully'])

   }
   showHidePassword(){
     this.hidePassword = !this.hidePassword;
   }
}
