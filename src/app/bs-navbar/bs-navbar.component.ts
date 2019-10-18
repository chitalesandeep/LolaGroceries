import { Component, OnInit } from '@angular/core';
import { AuthUserService } from "../auth-user.service";
import { Appuser } from "../app-user";
import { Router } from "@angular/router";
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../shoppingCart';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{

  appuser:Appuser;
  totalCartItems:number;
  cart$:Observable<ShoppingCart>;

  constructor(private authS:AuthUserService, 
            private rote:Router,
            private cartserv: ShoppingCartService) {
  }

  async ngOnInit() {
    
    this.authS.appUser$.subscribe( res => this.appuser = res);

    this.cart$ = await this.cartserv.getCart();
  }

  logout() {
    this.authS.logout();
    this.rote.navigate(['/login']);
  }

}
