import { Component } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from "@angular/forms";
import { AuthUserService } from "../auth-user.service";
import { AddusersService } from "../addusers.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginFG:FormGroup;

  constructor(private fb:FormBuilder,private authservice:AuthUserService,private userv:AddusersService) {
   
    this.loginFG = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });
   }

  get username() {
    return this.loginFG.get('username');
  }

  get password() {
    return this.loginFG.get('password');
  }

  LoginUser() {
   // const uname = this.loginFG.controls.username.value;
   // const upassword = this.loginFG.controls.password.value;

  }

  GoogleLogin() {

    this.authservice.login();
  }
}
