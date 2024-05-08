import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.sevices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {
  constructor( private authService: AuthService, private router: Router){}
  onLogin():void {
    this.authService.login('daniel@gmail.com', '123456789')
      .subscribe( user => {
        this.router.navigate(['/']);
      });
  }
}
