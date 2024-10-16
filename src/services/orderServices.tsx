import axios, { AxiosResponse } from "axios";
import { Order, OrderModel } from "../types/cartTypes";
import { OrderDTO, OrderResponse, PaymentIds } from "../types/orderTypes";
import { User } from "../types/userTypes";
import { APIS, CHECKOUT, ORDER } from "../utils/constants";

export const orderServiceCreate = async (order : Order , user : User) : Promise<OrderResponse | undefined> =>{
    const orderdto : OrderDTO ={
        username: user.name,
        mobilenumber: user.mobilenumber,
        emailaddress: user.email,
        address: user.address,
        pincode: user.pincode,
        state: user.state,
        district: user.district,
        items: order.items,
        totalAmount: order.totalAmount,
        receipt: order.receipt,
        note: order.note,
        createdAt: order.createdAt
    }
    console.log(orderdto);
    try {
        const res : AxiosResponse<OrderResponse> = await axios.post(`${APIS.API}${APIS.CONTEXT}${CHECKOUT.CHECKOUT}${CHECKOUT.CREATEORDER}`,
            orderdto
        )
        console.log(res.data);
        return res.data;
    } catch (error) {
        return undefined;
    }
}

export const orderServiceUpdate = async (payemnt: PaymentIds) :Promise<boolean | undefined > => {
    try {
        const res = await axios.put(`${APIS.API}${APIS.CONTEXT}${CHECKOUT.CHECKOUT}${CHECKOUT.UPDATEORDER}`,
            payemnt
        );
        if(res.status === 200){
            return true;
        }
        
    } catch (error) {
        return false;
    }
}

export const orderServiceGet = async () :Promise<OrderModel[] | undefined > =>{
    try {
        const res : AxiosResponse<OrderModel[]> = await axios.get(`${APIS.API}${APIS.CONTEXT}${ORDER.ORDER}`);
      
        if(res.status === 200){
            return res.data;
        }
        
    } catch (error) {
        return undefined;
    }
}

export const orderServiceAdminGet = async () :Promise<OrderModel[] | undefined > =>{
    try {
        const res : AxiosResponse<OrderModel[]> = await axios.get(`${APIS.API}${APIS.CONTEXT}${ORDER.ORDER}${ORDER.ADMIN}`);
        
        if(res.status === 200){
            return res.data;
        }
        
    } catch (error) {
        return undefined;
    }
}