import { AngularFireAuth } from "angularfire2/auth";
import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Appuser } from './app-user';
import { AddusersService } from './addusers.service';
import "rxjs/add/operator/switchMap";
import "rxjs/add/observable/of";

@Injectable()
export class AuthUserService {

  user$: Observable<firebase.User>;

  constructor(
      private uservice:AddusersService,
      private authI:AngularFireAuth, 
      private route:ActivatedRoute) { 
      this.user$ = authI.authState;
  }

  login() {
    let responseUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',responseUrl);

    this.authI.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
      this.authI.auth.signOut();
  }

  get appUser$(): Observable<Appuser> {
      return this.user$.switchMap(user => {
        if(user) return this.uservice.getUser(user.uid);

        return Observable.of(null);
      });
  }

}
