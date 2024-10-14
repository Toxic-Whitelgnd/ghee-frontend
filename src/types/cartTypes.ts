export interface CartItems {
    cartItems: Items[];
}

export interface Items {
    id:number,
    name:string
    price: number[],
    quantity:number,
    description:string,
    images?:string,
    quantitysize?: number[];
    ratings?: number;
    ratingStar?: string;
    offerprice?: number;
    instock?: boolean;
    itemQty?:number;
    finalPrice?: number;
}

export interface Order {
    id: number;
    items: Items[];            // List of items in the order
    totalAmount: number;       // Total order amount
    receipt?: string;          // Receipt (optional, can be generated after payment)
    note?: string;             // Optional customer note
    createdAt: Date;           // Date of the order creation
}