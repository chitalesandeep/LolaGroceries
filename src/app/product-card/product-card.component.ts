import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from '../product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('products') product: Product;
  @Input('showCart') showCart = true;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartServ: ShoppingCartService) { }

  addtocart() {
      this.cartServ.addToCart(this.product);
  }
}
