import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'

import { UserService } from 'src/app/services/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  

  constructor( private userService: UserService, private router: Router ){

  }

  canActivate(): boolean{
    if (this.userService.getToken()){
      return true
    }

    this.router.navigate(['login']);
    return false
  }
  
}
