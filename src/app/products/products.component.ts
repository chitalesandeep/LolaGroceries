import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from "../../app/product-service.service";
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {

  products:Product[] = [];
  filteredProducts:Product[] = [];
  category:string;
  showCart:boolean = true;
  cart:any;
  subscribtion:Subscription;

  constructor(
        private route:ActivatedRoute,
        private productsrv: ProductService,
        private cartserv:ShoppingCartService) {

    productsrv.getAll('/products').subscribe( data => { this.filteredProducts = this.products = data});

      route.queryParamMap.subscribe(params => {
          this.category = params.get('category');

          this.filteredProducts = this.category ? this.products.filter( e => e.category == this.category):
            this.products;
        })
   }

   async ngOnInit() {
     this.subscribtion = (await this.cartserv.getCart()).subscribe( res => this.cart = res );
   }

   ngOnDestroy() {
     this.subscribtion.unsubscribe();
   }
}
