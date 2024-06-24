import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { PatientService } from 'src/app/services/patient.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent {
  rate
  comment = ''
  storageUrl = environment.storageUrl

  constructor(public dialogRef: MatDialogRef<RateComponent> , @Inject(MAT_DIALOG_DATA) public data: any,
    private service : PatientService,
    private spinner: NgxSpinnerService,
  ){
    console.log(data)
  }
  saveRating(){
    debugger
    if(!this.rate){
      // alert('من فضلك اختر التقيم')
      Swal.fire({
        icon: 'error',
        title: 'من فضلك اختر التقيم',
        showConfirmButton: false,
        timer: 1500
      })
      return


    }
       const form = {
        DoctorId : this.data.doctor.DoctorId,
        Rate : this.rate,
        Comment : this.comment
      }
      this.spinner.show()
      this.service.createDoctorRate(form).subscribe(res=>{
        console.log(res)
        Swal.fire({
          icon: 'success',
          title: 'تم التقييم بنجاح',
          showConfirmButton: false,
          timer: 1500
        })
        this.spinner.hide()
        this.dialogRef.close({
          event: 'close',
        })
      })
  }
}
