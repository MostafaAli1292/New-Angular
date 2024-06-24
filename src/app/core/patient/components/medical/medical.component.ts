import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, debounceTime, map } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medical',
  templateUrl: './medical.component.html',
  styleUrls: ['./medical.component.scss']
})
export class MedicalComponent {
  @Input() PatientId;
  // @Input() AppointmentId;

  public EmrHistory : any
   public AppointmentId = this.route.snapshot.paramMap.get('AppointmentId')

  public EmrDetails : any
  storageUrl = environment.storageUrl;
  instruction:any = null
  rxTitle
  rxDescription
  showAddButton = false
  constructor(private patient:PatientService,private spinner:NgxSpinnerService, public route: ActivatedRoute,
    ) {
    this.inputSubject.pipe(debounceTime(1000)).subscribe(() => {
      this.onDiagnosisInputChange();
    });
  }

  ngOnInit(): void {
    debugger
    console.log(this.AppointmentId)
      this.getPatientEmrDetails()
  }


  // get data from patient emr details
  getPatientEmrDetails(AppointmentId = this.AppointmentId){
    this.spinner.show()
    this.patient.getPatientEmrDetails(AppointmentId).subscribe(res=>{
      console.clear()
      debugger;
      console.log(res)
      this.EmrDetails = res['Data'];

      this.spinner.hide()
    })
  }

  addInstruction(instruction){
    const form = {
      "AppointmentId" : Number(this.AppointmentId),
      "Instructions" : instruction
    }
    this.spinner.show()

  }


  addRx(rxTitle,rxDescription){
    if(rxTitle == null || rxDescription == null){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill all fields',
        timer: 600,
        showConfirmButton: false
      })
      return
    }
    const form = {
      "AppointmentId" : Number(this.AppointmentId),
      "Title" : rxTitle,
      "Description" : rxDescription
    }
    this.spinner.show()

  }

  uploadFiles(e:any){
    if(e.target.files.length == 0){
      return
    }
    this.spinner.show()
    // loops through all files
    for (let index = 0; index < e.target.files.length; index++) {
      const file = e.target.files[index]
      const formData = new FormData()
      formData.append('document',file)


    }
    this.getPatientEmrDetails()
    this.spinner.hide()

    return
    // const file = e.target.files[0]
    // const formData = new FormData()
    // formData.append('document',file)
    // formData.append('appointmentId',this.AppointmentId)
    // this.spinner.show()
    // this.patient.createPatientEmrDocument(formData).pipe(map(res=>res['Data'])).subscribe(res=>{
    //   console.log(res)
    //   this.spinner.hide()
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Success',
    //     text: 'File uploaded successfully',
    //     timer: 600,
    //     showConfirmButton: false
    //   }).then(()=>{
    //     this.getPatientEmrDetails()
    //   })
    // })
  }

  private inputSubject = new Subject<string>();
  onDiagnosisInput(value){
    this.inputSubject.next(value);
  }
  onDiagnosisInputChange() {
    this.addInstruction(this.instruction)
  }
}
