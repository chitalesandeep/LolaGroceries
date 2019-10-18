import { ShoppingCartitems } from './shoppingCartItems';
import { Product } from './product';

export class ShoppingCart {

    items: ShoppingCartitems[] = [];

    constructor ( public itemsMap: { [productId:string]: ShoppingCartitems } ) {
        
        this.itemsMap = this.itemsMap || {};
        
        for(let productId in itemsMap) {
            let item = itemsMap[productId];
            this.items.push(new ShoppingCartitems({...item,$key:productId}));
        }
    }

    getQuantity (product:Product) {

        let item = this.itemsMap[product.$key];
        return item ? item.quantity : 0;
    }

    get cartTotalPrice(){
        let sum = 0;
        for( let item in this.items) 
        sum += this.items[item].TotalPrice;
        return sum;
    }

    get TotalItemsCount() {
        let count = 0;

        for(let productId in this.itemsMap) {
            count += this.itemsMap[productId].quantity;
        }
        return count;
    }
}