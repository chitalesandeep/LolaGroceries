import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterationComponent } from './registeration.component';
import { AddusersService } from "../addusers.service";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

describe('RegisterationComponent', () => {
  let component: RegisterationComponent;
  var cmp: RegisterationComponent;
  let fixture: ComponentFixture<RegisterationComponent>;
  var userT:AddusersService;
  var rt:Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  beforeEach(() => {
    cmp = new RegisterationComponent(rt,new FormBuilder(),userT);
  });

  it('it should contain name and email',() => {
      expect(cmp.enrollForm.contains('name')).toBeTruthy();
      expect(cmp.enrollForm.contains('email')).toBeTruthy();
  });

});
