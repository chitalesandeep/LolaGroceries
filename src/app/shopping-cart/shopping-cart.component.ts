import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../shoppingCart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$;
  shoppingCart:ShoppingCart;
  
  constructor(private cartserv: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartserv.getCart();
  }

  clearCart(){
    this.cartserv.clearShoppingCart();
  }
}
