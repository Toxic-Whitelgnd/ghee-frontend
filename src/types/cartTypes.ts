export interface CartItems {
    cartItems: Items[];
}

export interface Items {
    id:number,
    name:string
    price: number[],
    quantity:number,
    description:string,
    image:string,
    quantitysize?: number[];
    ratings?: number;
    ratingStar?: string;
    offerprice?: number;
    instock?: boolean;
    itemQty?:number;
    finalPrice?: number;
}