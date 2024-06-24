import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { MatSelectFilterModule } from 'mat-select-filter';
// mat-select
import { MatSelectModule } from '@angular/material/select';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SearchFormComponent } from './shared/search-form/search-form.component';
import { ListingLayoutComponent } from 'src/app/@layouts/listing-layout/listing-layout.component';
import { FindADoctorComponent } from './components/find-a-doctor/find-a-doctor.component';
import { AppLayoutComponent } from 'src/app/@layouts/app-layout/app-layout.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { NgxViewerModule } from 'ngx-viewer';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BookingSuccessfullyComponent } from './components/booking-successfully/booking-successfully.component';
import { AddNoteForDoctorComponent } from './pop-ups/add-note-for-doctor/add-note-for-doctor.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BlogsComponent } from './components/blogs/blogs.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MyScheduleComponent } from './components/my-schedule/my-schedule.component';
import {MatTabsModule} from '@angular/material/tabs';
import { EditAppointmentComponent } from './pop-ups/edit-appointment/edit-appointment.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ProfileStepsModule } from './components/profile/profile-steps/profile-steps.module';
import {MatStepperModule} from '@angular/material/stepper';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgOptimizedImage } from '@angular/common';
import { BookFormComponent } from './shared/book-form/book-form.component';
import { TimeoutComponent } from './pop-ups/timeout/timeout.component'
import { TranslocoModule } from '@ngneat/transloco';
import { ChangeLanguageComponent } from './pop-ups/change-language/change-language.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import { MapboxComponent } from './shared/mapbox/mapbox.component';
import { RateComponent } from './shared/rate/rate.component';
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
import { EmergencyComponent } from './components/emergency/emergency.component';
import { AngelComponent } from './components/angel/angel.component';
import { BookedOfferComponent } from './components/booked-offer/booked-offer.component';
import { BookofferformComponent } from './shared/bookofferform/bookofferform.component';
import { BookingsuccessfullyofferComponent } from './components/bookingsuccessfullyoffer/bookingsuccessfullyoffer.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PolyClinicDoctorsComponent } from './components/poly-clinic-doctors/poly-clinic-doctors.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SearchFormComponent,
    ListingLayoutComponent,
    FindADoctorComponent,
    AppLayoutComponent,
    DoctorProfileComponent,
    BookingSuccessfullyComponent,
    AddNoteForDoctorComponent,
    BlogsComponent,
    AboutComponent,
    ContactUsComponent,
    MyScheduleComponent,
    EditAppointmentComponent,
    ProfileComponent,
    ChangePasswordComponent,
    FooterComponent,
    BookFormComponent,
    TimeoutComponent,
    ChangeLanguageComponent,
    MapboxComponent,
    RateComponent,
    HospitalsComponent,
    PolyclinicsComponent,
    PharmaciesComponent,
    LaboratoriesComponent,
    RadiologyCenterComponent,
    TermsOfUseComponent,
    TermsOfUseArComponent,
    PrivacyPolicyComponent,
    PrivacyPolicyArComponent,
    DoctorsPrivacyPolicyComponent,
    DoctorsPrivacyPolicyArComponent,
    SalamtakcapComponent,
    TrueOrfalseComponent,
    ScopeComponent,
    CareComponent,
    PromotionComponent,
    AskesComponent,
    OfferComponent,
    AskeslistComponent,
    MedicalComponent,
    EmergencyComponent,
    AngelComponent,
    BookedOfferComponent,
    BookofferformComponent,
    BookingsuccessfullyofferComponent,
    PolyClinicDoctorsComponent


   ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    MatSelectFilterModule,
    MatSelectModule,
    CarouselModule,
    AccordionModule.forRoot(),
    NgxViewerModule,
    MatDialogModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMatIntlTelInputComponent,
    MatIconModule,
    MatTabsModule,
    MatDatepickerModule,
    NgOptimizedImage,
    MatButtonModule,
    MatNativeDateModule, MatMomentDateModule,
    MatFormFieldModule,
    MatInputModule,
    ProfileStepsModule,
    MatStepperModule,
    TranslocoModule,
    MatBottomSheetModule,
    MatListModule,
    NgxSpinnerModule


    // ProfileStepsModule
    // MatFormFieldModule,
    //     MatInputModule
    // RouterModule.forRoot(routes, {
    //   scrollPositionRestoration: 'enabled',
    //   anchorScrolling: 'enabled',
    //   scrollOffset: [0, 25], // cool option, or ideal option when you have a fixed header on top.
    // });


  ],
  providers:[
    MatDatepickerModule,
     // AuthenticationService

  ]
})
export class PatientModule {

}
