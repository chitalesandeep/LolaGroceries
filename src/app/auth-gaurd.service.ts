import { Injectable } from '@angular/core';
import { AuthUserService } from "../app/auth-user.service";
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import "rxjs/add/operator/map";

@Injectable()
export class AuthGaurd implements CanActivate {

  constructor(private route:Router, private auth:AuthUserService) {  
   }

   canActivate(route, state:RouterStateSnapshot) {
      return this.auth.user$.map( user => {

        if(user)  return true;

           this.route.navigate(['/login'], { queryParams:{ returnUrl: state.url }});
           return false;
        
      });
   }
}
