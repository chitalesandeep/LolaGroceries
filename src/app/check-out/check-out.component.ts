import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../shoppingCart';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { AuthUserService } from '../auth-user.service';
import { order } from '../order';
import { OrderServiceService } from '../order-service.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy {

  shippingForm:FormGroup;
  shipping = {};
  cart:ShoppingCart;
  cartsubscription:Subscription;
  usersubscription:Subscription;
  userId:string;

  constructor(
    private redirect:Router,
    private orderServ:OrderServiceService,
    private authserv:AuthUserService,
    private shoppingServ: ShoppingCartService,
    private fb:FormBuilder) { 

      this.shippingForm = this.fb.group({
        'Name':['',Validators.required],
        'Address':['',Validators.required],
        'City':['',Validators.required]
      })
  }

  async ngOnInit() {
    let cart$ = await this.shoppingServ.getCart();
    this.cartsubscription = cart$.subscribe( cart => this.cart = cart );
    this.usersubscription = this.authserv.user$.subscribe( userid => this.userId = userid.uid);
  }

  ngOnDestroy() {
      this.cartsubscription.unsubscribe();
      this.usersubscription.unsubscribe();
  }

  get Name(){
    return this.shippingForm.get('Name');
  }
  
  get Address(){
    return this.shippingForm.get('Address');
  }
  
  get City(){
    return this.shippingForm.get('City');
  }
  
  async placeOrder(){
    this.shipping = this.shippingForm.value;

    let x = new order(this.userId,this.shipping,this.cart);
    let result = await this.orderServ.placeOrder(x);
    this.redirect.navigate(['/orders-success',result.key]);
  }
}
