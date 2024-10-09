export interface CartItems {
    cartItems: Items[];
}

export interface Items {
    id:number,
    name:string
    price: number,
    quantity:number,
    description:string,
    image:string,
    itemQty?:number
}