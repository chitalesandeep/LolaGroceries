import { Injectable } from '@angular/core';
import { AuthUserService } from "../app/auth-user.service";
import { CanActivate } from '@angular/router';
import "rxjs/add/operator/map";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminGaurd implements CanActivate {

  constructor(private auth:AuthUserService) { }

  canActivate() : Observable<boolean>{
     return this.auth.appUser$.map( appUser => {
         if(appUser.admin == 1) return true;
         return false;
      });
  }
}
