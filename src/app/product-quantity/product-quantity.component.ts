import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from '../product';
import { ShoppingCart } from '../shoppingCart';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent{

  @Input('products') product: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartServ: ShoppingCartService) { }

  addtocart() {
      this.cartServ.addToCart(this.product);
  }

  deletefromcart() {
    this.cartServ.deleteFromCart(this.product);
  }
}
