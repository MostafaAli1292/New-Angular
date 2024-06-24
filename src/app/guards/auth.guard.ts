import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
   constructor(private router: Router) { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
	   if (localStorage.getItem(`${environment.localStorageUserKey}`)) {
           return true;
	   }
	   this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
	   return false;
	}
}
