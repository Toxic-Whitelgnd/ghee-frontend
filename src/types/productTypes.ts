export interface ProductProps {
    id: number,
    name: string;
    quantity: number;
    price: number;
    description: string;
    image: string;
    quantitysize?:[];
    ratings?: number;
    ratingStar?: string;
    offerpercentage?: number;
    instock?: boolean;
    itemQty?:number
}   

export interface Product{
    id: number,
    name: string;
    quantity: number;
    price: number[];
    description: string;
    image: string;
    quantitysize?: number[];
    ratings?: number;
    ratingStar?: string;
    offerpercentage?: number;
    instock?: boolean;
    itemQty?:number;
}

export interface ProductItems {
    products: Product[]
}