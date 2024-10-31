import { Items } from "./cartTypes";
import ObjectId from 'bson-objectid';

export interface OrderDTO {
    username: string;
    mobilenumber?: string;
    emailaddress: string;
    address?: string;
    pincode?: string;
    state?: string;
    district?: string;
    items: Items[];  
    totalAmount: number;
    receipt?: string;
    note?: string;
    createdAt: Date;
    paymentmode?: string;
}

export interface OrderResponse {
    id: ObjectId;  // Use ObjectId type for id
    orderid: string;
    paymentid: string | null;
    paymentsignature: string | null;
    receipt: string;
    totalAmount: number;
    username: string;
    mobilenumber: string;
    emailaddress: string;
    address: string;
    pincode: number;
    state: string;
    district: string;
    note: string;
    createdAt: string;  // Date can be in ISO format
    items:Items[];  
    paymentmode: string;
  }

  export interface PaymentIds {
    orderid: string;
    paymentid: string;
    paymentsignature: string;
  }

  export interface BillingDetails {
    name: string;
    email: string;
    mobilenumber: string;
    address: string;
    pincode: string;
    state: string;
    district: string;
}

export interface EmailDTO {
  status: string,
  orderid: string
}

export interface PaymentVerificationDTO {
  orderid: string;
  paymentid: string;
}