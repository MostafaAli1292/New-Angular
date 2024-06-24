import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, timeout } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VerificationCodeComponent {
  codeCompleted = false;
  subject = new Subject();
  phone = '';
  fromPage = '';
  form:any ;
  r=''
  codeLength = 0;
  from = '';

  // ReSendCounter = 0;
  intervalId = 0;
  message :any = '';
  code = sessionStorage.getItem('auth-verification-code');
  seconds = 0;
  keyUpCode = null;
  registerForm =  JSON.parse(sessionStorage.getItem('sign-up-first-step') || '{}');
  constructor(private formbuilder:FormBuilder,private router: Router,private service:AuthenticationService,private spinner:NgxSpinnerService,private translocoService: TranslocoService)
   {
    this.router.parseUrl(this.router.url).queryParams['r']
    this.router.parseUrl(this.router.url).queryParams['p']
    this.from = this.router.parseUrl(this.router.url).queryParams['from']
    console.log(this.router.parseUrl(this.router.url).queryParams['r'])
    this.r = this.router.parseUrl(this.router.url).queryParams['r']

   }
  onCodeChanged(e:any){
      console.log(e)
      this.codeCompleted = false;
      this.keyUpCode = null;
  }
    onCodeCompleted(e:any){
      console.log(e)
      this.codeCompleted = true;
      this.keyUpCode = e;
      this.verify()
    }
  // on init
  ngOnInit() {
    this.form = JSON.parse(decodeURIComponent(escape(atob(this.router.parseUrl(this.router.url).queryParams['r']))));
    this.phone = this.router.parseUrl(this.router.url).queryParams['p'];
    this.fromPage = this.router.parseUrl(this.router.url).queryParams['from'];

console.log(this.fromPage)
console.log(this.fromPage)

    let code = String(this.form['Code']);
    this.codeLength = code.length;
    this.seconds = this.form['ReSendCounter'];
    console.log((this.form))
    this.start();


  }



  ngOnDestroy() { this.clearTimer(); }

  start() { this.countDown(); }
  stop()  {
    this.clearTimer();
    this.message = `${this.seconds}s`;
  }

  private clearTimer() { clearInterval(this.intervalId); }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        this.message = null;
        this.clearTimer();
        return
      } else {
        if (this.seconds < 0) { this.seconds = 120; } // reset
        this.message = `${this.seconds}s`;
      }
    }, 1000);
  }
  verify(){
    //
debugger
    console.log(this.form)
    console.log(this.keyUpCode)
    this.code = sessionStorage.getItem('auth-verification-code');
    if(this.keyUpCode == this.code){
      this.spinner.show()
      if(this.fromPage == 'forgot-password'){
        // عدم معرفه الرابط الصحيح للتحويل للصفحة الخاصة بتغيير كلمة المرور
        this.router.navigate(['/auth/new-password',this.r])
        this.spinner.hide()
        return

        return
      }


      this.service.createUser(this.registerForm).subscribe((res:any)=>{
        this.router.navigate(['/patient/profile'],{queryParams: {redirect: 'auth/reset-successfully'}}).then(() => {
          // To solve the problem of not adding the user to the service - temporarily
          // window.location.reload();
          this.spinner.hide()
        });
      })

      // this.router.navigate(['/auth/reset-successfully'])
    }else{
      Swal.fire({
        icon: 'error',
        title: this.translocoService.translate('authentication.verification-code.opps'),
        text: this.translocoService.translate('authentication.verification-code.mess')
      })
    }

    // let  = this.form['Code'];
    // this.router.navigate(['/auth/reset-successfully'])
  }
  reSendCode(){
debugger
this.start();

    if(this.fromPage == 'forgot-password'){
      function isEmail(email:any) {
        var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(email);
      }
      // remove 0 from phone number
      // if(this.phone[0] == '0'){
      //   this.phone = this.phone.substring(1)
      // }
      var form :any  = {
        "ResetMethod": 2 , // 2 for phone , 1 for email
        "Phone": this.phone,
        "Email": "",
        "UserTypeId": 3,
      }
      if(isEmail(this.phone)){
        form.ResetMethod = 1,
        form.Email = this.phone,
        form.Phone = ''
        form.UserTypeId = 3
      }
      this.service.ResetPassword(form).subscribe((res:any)=>{
        // let res = btoa(unescape(encodeURIComponent(JSON.stringify(res.Data))));
        // sessionStorage.setItem('reset-password-user-id',res['Data']['UserId'])
        this.form = res.Data;
        console.log(res.Data)
        console.log(res)
        Swal.fire({
          icon: 'success',
          title: 'Done',
          text: 'Verification code sent successfully !'
        })
        this.code = this.form.Code
        // sessionStorage.setItem('auth-verification-code',this.form.Code)
        // this.router.navigate(['/auth/new-password',this.r],
        // {
        //   queryParams: {
        //     r:res,
        //     p:this.phone
        //   }
        // })
        this.spinner.hide()
      })
      return
    }
    let userRegisterFirstStep = this.registerForm
    console.log(userRegisterFirstStep)
    this.spinner.show()
    this.service.signup(userRegisterFirstStep).subscribe((res:any)=>{
      debugger;
      sessionStorage.setItem('auth-verification-code',res.Data.Code)
      res = btoa(unescape(encodeURIComponent(JSON.stringify(res.Data))));
      this.form = res.Data;
      console.log(res.Data)
      console.log(res)
      // console.log(atob(res))
      this.router.navigate(['/auth/verification-code'],
      {
        queryParams: {
          r:res,
          p:this.phone
        }
      })
      this.spinner.hide()
    })

  }
}
