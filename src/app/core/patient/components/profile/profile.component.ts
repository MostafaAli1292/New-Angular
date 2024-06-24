import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent {
  @ViewChild('stepper') stepper: any;

  constructor(private service : AuthenticationService) {
    // setTimeout(() => {
    //   this.service.setStep(2);
    //   this.stepper.selectedIndex = 2;
    //   console.log('==================####=================')
    // }, 1000);

    // this.service.getStep().subscribe(res=>{
    //   console.log(res)
    //   try {
    //     this.stepper.selectedIndex = res;
    //   } catch (error) {

    //   }
    // })
  }
  afterViewInit() {
    // this.service.setStep(2);
    // this.stepper.selectedIndex = 1;
  }
}
