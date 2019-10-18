import { Component } from '@angular/core';
import { AuthUserService } from './auth-user.service';
import { Router } from '@angular/router';
import { AddusersService } from './addusers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lola Groceraies';

  constructor(route:Router ,private auth:AuthUserService, private user:AddusersService) {
       this.auth.user$.subscribe( resUrl => {
          if(resUrl) {
              user.add(resUrl);

              let returnUrl = localStorage.getItem('returnUrl');
              route.navigateByUrl(returnUrl);
          }
      });
  }
}
