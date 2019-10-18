import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";
import { ShoppingCart } from './shoppingCart';
import { Observable } from "rxjs";
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();

    return this.db.object('/shopping-carts/'+cartId).map( res => new ShoppingCart(res.items) );
  }

  async addToCart(product) {

    this.updateItem(product,1);
  }

  async deleteFromCart(product) {

     this.updateItem(product,-1);
  }

  async clearShoppingCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/'+cartId+'/items').remove();
  }

  private create() {
    return  this.db.list('/shopping-carts').push( {
      createDate : new Date().getTime()
    });
  }


  private getItems(cartId:string,productId:string) {
    return this.db.object('/shopping-carts/'+cartId+'/items/'+productId);
  }

  private async getOrCreateCartId():Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;
    let result = await this.create();
    localStorage.setItem("cartId",result.key);
    return result.key;
  }

  private async updateItem(product: Product, change:number) {

    let cartId = await this.getOrCreateCartId();
    let items$ = this.getItems(cartId,product.$key);
    items$.take(1).subscribe( item => {
       let qnty = (item.quantity || 0) + change;
       if(qnty === 0) items$.remove();
       else
      items$.update({ 
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: qnty
         });
    
     
    });
  }

}
