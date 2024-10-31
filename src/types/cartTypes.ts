import { Image } from "./productTypes";

export interface CartItems {
    cartItems: Items[];
}

export interface Items {
    id:string,
    name:string
    price: number[],
    quantity:number,
    description:string,
    images?: Image;
    quantitysize?: number[];
    ratings?: number;
    ratingStar?: string;
    offerprice?: number;
    instock?: boolean;
    itemQty?:number;
    finalPrice?: number;
    status?: string;
}

export interface ImageData {
    fileName: string;
    contentType: string;
    data: string; // Base64 encoded data
}

export interface Order {
    id: number;
    items: Items[];            // List of items in the order
    totalAmount: number;       // Total order amount
    receipt?: string;          // Receipt (optional, can be generated after payment)
    note?: string;             // Optional customer note
    createdAt: Date;           // Date of the order creation
    paymentmode: string;     // Payment method
}

// types/cartTypes.ts

export interface ItemModel {
    name: string;
    price: number[]; // Assuming price can be an array of numbers (based on your backend)
    quantity: number;
    description: string;
    quantitySize: number[]; // Assuming quantitySize can be an array of numbers
    offerPrice: number;
    inStock: boolean;
    itemQty: number;
    finalPrice: number;
    status: string;
  }
  
  export interface OrderModel {
    id: string; // ObjectId will be converted to string in JSON
    username: string;
    mobilenumber: string;
    emailaddress: string;
    address: string;
    pincode: number;
    state: string;
    district: string;
    items: ItemModel[];
    totalAmount: number;
    receipt: string;
    note: string;
    createdAt: Date;
    orderid: string;
    paymentid: string;
    paymentsignature: string;
    status?: string;
    paymentmode?: string;
  }
  
