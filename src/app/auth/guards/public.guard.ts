import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.sevices';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate{
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private checkAuthStatus(): boolean | Observable< boolean > {
    return this. authService.checkAuthentication()
      .pipe(
        tap( isAuthenticated => {
          if( isAuthenticated ) {
            this.router.navigate(['./']);
          }
        }),
        map( isAuthenticated => !isAuthenticated )
      );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable< boolean >  {
    // console.log('Can Match')
    // console.log( { route, state } )
    return this.checkAuthStatus();
  }
  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable< boolean >  {
    // console.log('Can Activate')
    // console.log( {route, segments})
    return this.checkAuthStatus();
  }

}
