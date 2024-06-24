import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from '../services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { TimeoutComponent } from '../core/patient/pop-ups/timeout/timeout.component';
// import { AuthenticationService } from '../auth/authentication.service';
// declare var toastr: any;


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService,private spinner:NgxSpinnerService,private service:AuthenticationService,

    public dialog: MatDialog
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((err ) => {
          console.log(err)
          this.spinner.hide()

          // if timeout
          if(err.name == 'TimeoutError'){
            this.dialog.open(TimeoutComponent,
            {
              // disableClose: true,
            });
            return throwError(err);
          }
          switch (err.status) {
            case 400:
              if(err.error.Message){
                this.toastr.error('Error status 400 !', err.error.Message)
              }
              if(err.error.errors){
                for (var i in err.error.errors) {
                  this.toastr.error('Error status 400 !', err.error.errors[i])
                }
              }
              // this.toastr.error('Error status 400 !', err.error.Message)
              break;
            case 401:
              // var currentWaitingUser = localStorage.getItem('currentWaitingUser');
              // if(currentWaitingUser){
              //   return throwError(err);
              // }
              this.toastr.error('Error status 401 !', 'Unauthorized access !')
              this.service.logout()
              break;


          }

//             if ([401, 403].indexOf(err.status) !== -1) {
//                 // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
//                  this.authenticationService.logout();
//                 //  location.reload(true);
//             }
//
            const error = err.error.message || err.statusText;
            // this.toastr.error('error !', err.error.Message)
//             for (var i in err.error.msg.messages) {
//                 toastr.error('error !', err.error.msg.messages[i])
//               }

            return throwError(error);

        }))
    }
}
