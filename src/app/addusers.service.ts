import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Appuser } from "../app/app-user";

@Injectable({
  providedIn: 'root'
})
export class AddusersService {

  constructor(private db:AngularFireDatabase) { }

  add(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
        name:user.displayName,
        email: user.email,
        admin:1
    });
  } 

  insert(user) {
  
     return this.db.list('/users/').push({
      name:user.name,email:user.email,admin:user.admin
     });

  }
  getUser(uid:string):FirebaseObjectObservable<Appuser> {
    return this.db.object('/users/'+ uid);
  }

  getUserbyEmail(email:string) {
     // return this.db.object('/users/'+email);
  }
}