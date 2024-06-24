import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const currentUser = this.authenticationService.currentUserValue;
         const isLoggedIn = currentUser && currentUser['Token'];
        const isApiUrl = request.url.startsWith(environment.apiUrl);

        // replace {lang} with current language
        if (request.url.includes('{lang}')) {
            request = request.clone({
                url: request.url.replace('{lang}', localStorage.getItem('lang') || 'en')
            });
          }

        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.Token}`
                }
            });
        }

        return next.handle(request);
    }
}
