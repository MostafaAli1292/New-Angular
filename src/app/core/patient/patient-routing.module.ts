import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from 'src/app/@layouts/app-layout/app-layout.component';
import { ListingLayoutComponent } from 'src/app/@layouts/listing-layout/listing-layout.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AboutComponent } from './components/about/about.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { BookingSuccessfullyComponent } from './components/booking-successfully/booking-successfully.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { FindADoctorComponent } from './components/find-a-doctor/find-a-doctor.component';
import { HomeComponent } from './components/home/home.component';
import { MyScheduleComponent } from './components/my-schedule/my-schedule.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileStepsModule } from './components/profile/profile-steps/profile-steps.module';
import { HospitalsComponent } from './components/hospitals/hospitals.component';
import { PolyclinicsComponent } from './components/polyclinics/polyclinics.component';
import { PharmaciesComponent } from './components/pharmacies/pharmacies.component';
import { LaboratoriesComponent } from './components/laboratories/laboratories.component';
import { RadiologyCenterComponent } from './components/radiology-center/radiology-center.component';
import { TermsOfUseComponent } from './shared/terms-of-use/terms-of-use.component';
import { TermsOfUseArComponent } from './shared/terms-of-use-ar/terms-of-use-ar.component';
import { PrivacyPolicyComponent } from './shared/privacy-policy/privacy-policy.component';
import { PrivacyPolicyArComponent } from './shared/privacy-policy-ar/privacy-policy-ar.component';
import { DoctorsPrivacyPolicyComponent } from './shared/doctors-privacy-policy/doctors-privacy-policy.component';
import { DoctorsPrivacyPolicyArComponent } from './shared/doctors-privacy-policy-ar/doctors-privacy-policy-ar.component';
import { SalamtakcapComponent } from './components/SalamtakCap/salamtakcap.component';
import { TrueOrfalseComponent } from './components/true-orfalse/true-orfalse.component';
import { ScopeComponent } from './components/scope/scope.component';
import { CareComponent } from './components/care/care.component';
import { PromotionComponent } from './components/promotion/promotion.component';
import { AskesComponent } from './components/askes/askes.component';
import { OfferComponent } from './components/offer/offer.component';
import { AskeslistComponent } from './components/askeslist/askeslist.component';
import { MedicalComponent } from './components/medical/medical.component';
import { AngelComponent } from './components/angel/angel.component';
import { EmergencyComponent } from './components/emergency/emergency.component';
import { SuccesComponent } from './components/profile/profile-steps/succes/succes.component';
import { BookedOfferComponent } from './components/booked-offer/booked-offer.component';
import { BookingsuccessfullyofferComponent } from './components/bookingsuccessfullyoffer/bookingsuccessfullyoffer.component';
import { TranslocoService } from '@ngneat/transloco';
import { TranslateService } from '@ngx-translate/core';
import enTranslations from 'src/assets/i18n/en.json';
import arTranslations from 'src/assets/i18n/ar.json';
import { PolyClinicDoctorsComponent } from './components/poly-clinic-doctors/poly-clinic-doctors.component';

var routes: Routes = [
  { path: '', redirectTo: translateRoute('homePath'), pathMatch: 'full' },

  {
    path: '',
    component: AppLayoutComponent,
     children: [
      {path:'home',component:HomeComponent},
      {
        path: '',
        component: ListingLayoutComponent,
        children: [
          {path:'find-a-doctor',component:FindADoctorComponent},
          //
          {path:'hospitals',component:HospitalsComponent},
          {path:'polyclinics',component:PolyclinicsComponent},
          {path:'PolyDoctors',component:PolyClinicDoctorsComponent},
          {path:'pharmacies',component:PharmaciesComponent},
          {path:'laboratories',component:LaboratoriesComponent},
          {path:'radiology-center',component:RadiologyCenterComponent},
          {path:'SalamtakAngel',component:AngelComponent},
          {path:'emergency',component:EmergencyComponent},
          { path: 'succ', component: SuccesComponent },

          // { path: 'succ', component: SuccesComponent },

          {
            path:'doctor-profile/:doctorId',
            component:DoctorProfileComponent
           },
          {path:'booking-successfully',component:BookingSuccessfullyComponent},
          {path:'booking-successfully-offer',component:BookingsuccessfullyofferComponent},
          {path:'SalamtakGate',component:BlogsComponent},
          {path:'SalamtakCapsola',component:SalamtakcapComponent},
          {path:'SalamtakTrueOrFalse',component:TrueOrfalseComponent},
          {path:'SalamtakScoop',component:ScopeComponent},
          {path:'SalamtakCare',component:CareComponent},
          {path:'SalamtakPromotions',component:PromotionComponent},
          {path:'about',component:AboutComponent},
          {path:'contact-us',component:ContactUsComponent},
          {path:'termsOf',component:TermsOfUseComponent},
          {path:'termsOfAr',component:TermsOfUseArComponent},
          {path:'privacyPolicy',component:PrivacyPolicyComponent},
          {path:'privacyPolicyAr',component:PrivacyPolicyArComponent},
          {path:'doctorPrivacy',component:DoctorsPrivacyPolicyComponent},
          {path:'doctorPrivacyAr',component:DoctorsPrivacyPolicyArComponent},
          {path:'my-schedule',component:MyScheduleComponent},
          {path:'change-password',component:ChangePasswordComponent},
          {path:'medical/:AppointmentId',component:MedicalComponent},
          { path: 'ask', component: AskesComponent },
          { path: 'askList', component: AskeslistComponent },
          { path: 'offer/:offerId', component: OfferComponent },
          { path: 'bookOffer/:offerId', component: BookedOfferComponent },
          { path: 'profile', loadChildren: () => ProfileStepsModule },

        ]
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule {

  constructor(private translocoService: TranslocoService ) {
   }


}
function translateRoute(route: string) {
  const lang = localStorage.getItem('lang');
  const translations = lang === 'ar' ? arTranslations : enTranslations;

  const translatedRoute = translations[route];
  return translatedRoute || route;
}


