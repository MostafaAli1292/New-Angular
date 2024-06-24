import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationLayoutComponent } from 'src/app/@layouts/authentication-layout/authentication-layout.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ResetSuccessfullyComponent } from './reset-successfully/reset-successfully.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerificationCodeComponent } from './verification-code/verification-code.component';

const routes: Routes = [
  { path:'',redirectTo:'sign-up',pathMatch:'full' },

  {
    path: '',
    component: AuthenticationLayoutComponent,
    children: [
      // Login & Forget password
      {path:'login',component:LoginComponent},
      {path:'forgot-password',component:ForgotPasswordComponent},


      // query params email and response code from api
      {path:'verification-code',component:VerificationCodeComponent},
      {path:'new-password/:token',component:NewPasswordComponent},
      {path:'reset-successfully',component:ResetSuccessfullyComponent},


      // Sign Up & Doctor Profile & Clinic Profile
      {path:'sign-up',component:SignUpComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
