import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router){
    // Do nothing.
  }

  canActivate(): boolean{
    let userLoggedIn = true;
    if(!this.userService.isSessionPresent()){
      this.router.navigate(['/login']);
      userLoggedIn = false;
    }

    return userLoggedIn;
  }
}
