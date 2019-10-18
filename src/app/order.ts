import { ShoppingCart } from './shoppingCart';

export class order{
    datetime:number; 
    items:any[];

    constructor(public userId:string, public shipping:any, shoppingCart:ShoppingCart){
        this.datetime = new Date().getTime();

        this.items = shoppingCart.items.map( i=> {
            return {
                product:{
                    title:i.title,
                    image:i.image,
                    price:i.price
                },
                quantity:i.quantity,
                TotalPrice:i.TotalPrice
            }
        });
    }

    
}