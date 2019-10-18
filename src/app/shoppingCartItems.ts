export class ShoppingCartitems {

    $key: string;
    title: string;
    price: number;
    image: string;
    quantity: number;

    constructor(init?:Partial<ShoppingCartitems>){
        Object.assign(this,init);
    }

    get TotalPrice() {
       return this.price * this.quantity;
    }
}