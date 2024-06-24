import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstStepComponent } from './first-step/first-step.component';
import { PatientModule } from '../../../patient.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { SecondStepComponent } from './second-step/second-step.component';
import { ThirdStepComponent } from './third-step/third-step.component';
import { TranslocoModule } from '@ngneat/transloco';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from '../profile.component';
import {MatSelectModule} from '@angular/material/select';
import { AskesComponent } from '../../askes/askes.component';
import { SuccesComponent } from './succes/succes.component';


const routes :any = [
  { path: '', redirectTo: 'personal-info', pathMatch: 'full' },

  {
    path: '',
    component: ProfileComponent,
    children: [
      {path:'',component:FirstStepComponent},
      { path: 'personal-info', component: FirstStepComponent },
      { path: 'location', component: SecondStepComponent },
      { path: 'medical-state', component: ThirdStepComponent },

    ]
  },
]
@NgModule({
  declarations: [
    FirstStepComponent,
    SecondStepComponent,
    ThirdStepComponent,
    SuccesComponent,
  ],
  imports: [
    CommonModule,
    //
    RouterModule.forChild(routes),
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMatIntlTelInputComponent,
    MatIconModule,
    MatTabsModule,
    MatDatepickerModule,
    MatSelectModule,

    MatButtonModule,
    MatNativeDateModule, MatMomentDateModule,
    MatFormFieldModule,
    MatInputModule,
    TranslocoModule
  ],
  exports: [
    FirstStepComponent,
    SecondStepComponent,
    ThirdStepComponent
  ]
})
export class ProfileStepsModule { }
