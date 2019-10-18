import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private db:AngularFireDatabase, private shopServ:ShoppingCartService) { }

  placeOrder(order) {
    let result = this.db.list('/orders').push(order);
    this.shopServ.clearShoppingCart();
    return result;
  }
}
