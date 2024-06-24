import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TranslatedRoutesResolver implements Resolve<any> {
  constructor(private translocoService: TranslocoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const translatedRoutes = this.translocoService.selectTranslateObject('routes', {}, route.params['lang']);
    return translatedRoutes.pipe(
      map(routes => {
        return routes.map((route: any) => {
          return {
            ...route,
            path: route.path ? route.path : '',
            redirectTo: route.redirectTo ? route.redirectTo : '',
          };
        });
      })
    );
  }
}
