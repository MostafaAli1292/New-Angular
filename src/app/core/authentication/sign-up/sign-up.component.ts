import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  @ViewChild('phone_number', { static: true }) phoneNumberInput!: NgxMatIntlTelInputComponent;
  hidePassword = true;
	CountryISO = CountryISO;
  base64 = '';
  @ViewChild(NgxMatIntlTelInputComponent, { static: true })
  private phoneComponent: any;
  @ViewChild('FullNameEnInput') FullNameEnInput: any;

    public submitted = false;
    public form:FormGroup = this.formbuilder.group({
      // FullNameEn:['',Validators.required],
      FullNameEn :['', [Validators.required, this.customValidator()]],     // FullNameAr:['',Validators.required],
      FullNameAr : ['', [Validators.required, this.arabicThreeWordsValidator()]],
      Phone:['',Validators.required],
      Email:['',[Validators.required,Validators.email]],
      Password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/), // Updated pattern
        ]
      ],
       ConfirmPassword: ['', [Validators.required]],
      image:['',Validators.nullValidator],
      Terms : ['',Validators.nullValidator],
    }, { validator: MustMatch('Password', 'ConfirmPassword') })

    constructor(private router: Router,private formbuilder:FormBuilder,private service:AuthenticationService,private spinner:NgxSpinnerService,private http:HttpClient , private translocoService: TranslocoService,private elementRef: ElementRef
      ) { }

    ngOnInit(): void {

    }
    ngAfterViewInit() {
      const inputElement = this.elementRef.nativeElement.querySelector('.ngx-mat-intl-tel-input input');
      if (inputElement) {
        inputElement.placeholder = 'Enter your mobile here';
      }
    }
    get f() {return this.form.controls}
    submit(){
      debugger
      this.submitted = true;
      console.log(this.form.value)
      if (this.form.invalid) {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
        return
      }
      this.form.value.Phone =  this.phoneComponent.numberInstance.nationalNumber
      this.spinner.show()
      this.form.value.image = this.base64
      this.service.signup(this.form.value).subscribe((res:any)=>{
        debugger;
        sessionStorage.setItem('sign-up-first-step',JSON.stringify(this.form.value))
        localStorage.setItem('currentUser',JSON.stringify(this.form.value));
        sessionStorage.setItem('auth-verification-code',res.Data.Code)

        res = btoa(unescape(encodeURIComponent(JSON.stringify(res.Data))));
        console.log(res)
        // console.log(atob(res))
        this.router.navigate(['/auth/verification-code'],
        {
          queryParams: {
            // response
            r:res,
            // phone number
            p : this.form.value.Phone,
          }
        })
        this.spinner.hide()
      }
      )
    }
    showHidePassword(){
      this.hidePassword = !this.hidePassword;
    }
    hanedlFileInput(e: any) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.base64 = reader.result as string;
        console.log(this.base64)
        this.form.patchValue({
          image: this.base64
        });
      };
    }
    // ngAfterViewInit(): void {
    //   fromEvent(this.FullNameEnInput.nativeElement, 'input')
    //     .pipe(map((event: any) => (event.target as HTMLInputElement).value))
    //     .pipe(debounceTime(500))
    //     .pipe(distinctUntilChanged())
    //     .subscribe((text:any) => {
    //       // if(!text){
    //       //   // this.results = []
    //       //   return 0
    //       // }
    //     //  this.service.translateNameFromYandex(
    //     //   this.form.value.FullNameEn,
    //     //   ).subscribe((res:any)=>{
    //     //   console.clear()
    //     //   console.log(res)
    //     //   this.form.patchValue({
    //     //     FullNameAr: res.text[0]
    //     //   });
    //     //  }
    //     //   )
    //     });
    // }
    // onKeydownEvent(e){
    //   (e.target.value) ? this.loading = true :this.loading = false
    // }

    goto(){
      debugger

      const lang = localStorage.getItem('lang');
      if (lang) {
        this.translocoService.setActiveLang(lang);
        if (lang === 'ar') {
          document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
          window.open('/patient/termsOfAr')

        }
        else {
          document.getElementsByTagName('html')[0].setAttribute('dir', 'ltr');
          window.open('/patient/termsOf')

        }
      }
      debugger
      // window.open('/patient/termsOf')

      // this.router.navigate(['/patient/termsOf'])

    }
    customValidator() {
      return (control: AbstractControl): { [key: string]: boolean } | null => {
        const value: string = control.value;

        if (!value) {
          return { 'required': true }; // Return required error if the field is empty
        } else if (!/^[a-zA-Z ]*$/.test(value)) {
          return { 'pattern': true }; // Return pattern error if non-English characters are entered
        } else if (value.split(' ').length < 3) {
          return { 'space': true }; // Return space error if the input does not contain three words
        }

        return null; // Return null if no error
      };
    }
    elevenDigitNumberValidator(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value: string = control.value;

        // Check if the value is a number and has exactly 11 digits
        if (!/^\d{11}$/.test(value)) {
          return { 'invalidNumber': true };
        }

        return null;
      };
    }
    arabicThreeWordsValidator() {
      return (control: AbstractControl): { [key: string]: boolean } | null => {
        const value: string = control.value;

        if (!value) {
          return { 'required': true }; // Return required error if the field is empty
        } else if (!/[\u0600-\u06FF]/.test(value)) {
          return { 'pattern': true }; // Return pattern error if non-Arabic characters are entered
        } else if (value.split(' ').length <3) {
          return { 'space': true }; // Return space error if the input does not contain three words
        }

        return null; // Return null if no error
      };
    }
     emailValidator(control: FormControl) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValid = emailPattern.test(control.value);

      if (!isValid) {
        return { 'invalidEmail': true };
      }

      const domain = control.value.split('@')[1];
      if (domain) {
        const validDomains = ['com', 'org', 'net', 'edu']; // Add more valid domains as needed
        const isValidDomain = validDomains.some(validDomain => domain.includes(validDomain));

        if (!isValidDomain) {
          return { 'invalidDomain': true };
        }
      }

      return null;
    }
}
