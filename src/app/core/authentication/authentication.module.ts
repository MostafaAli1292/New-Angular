import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerificationCodeComponent } from './verification-code/verification-code.component';
import { CodeInputModule } from 'angular-code-input';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ResetSuccessfullyComponent } from './reset-successfully/reset-successfully.component';
import { SignUpComponent } from './sign-up/sign-up.component';
// NgxIntlTelInputModule
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
// NgxMatIntlTelInputModule
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { environment } from 'src/environments/environment';
import { ContactUsComponent } from './contact-us/contact-us.component';

export const loader = environment.languages.reduce((acc, lang) => {
  acc[lang] = () => import(`src/assets/i18n/authentication/${lang}.json`);
  return acc;
}, {});
// src/
@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    VerificationCodeComponent,
    NewPasswordComponent,
    ResetSuccessfullyComponent,
    SignUpComponent,
    ContactUsComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    CodeInputModule.forRoot({

    }),
    HttpClientModule ,
    NgxMatIntlTelInputComponent,
    TranslocoModule

  ],
  schemas : [
    CUSTOM_ELEMENTS_SCHEMA

  ],
  providers: [
    // AuthenticationService,
    HttpClientModule,
    // {provide: TRANSLOCO_SCOPE, useValue: 'authentication'}
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'authentication',
        loader
      }
    }
  ]

})
export class AuthenticationModule { }
