import { Component, OnInit } from '@angular/core';
import { AddusersService } from "../addusers.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {

  enrollForm:FormGroup;

  constructor(
      private rt:Router,
      private fb:FormBuilder,
      private userT:AddusersService
    ) { 

    this.enrollForm = this.fb.group({
        name:['',Validators.required],
        email:['',Validators.email],
        admin:['1']
    });

  }

  ngOnInit() {
  }

  name() {
    return this.enrollForm.get('name');
  }

  email() {
    return this.enrollForm.get('email');
  }

  admin() {
    return this.enrollForm.get('admin');
  }

  submitData() {
    let val = this.userT.insert(this.enrollForm.value);

    if(val) this.rt.navigate(['/shopping-cart']);
  }
}
