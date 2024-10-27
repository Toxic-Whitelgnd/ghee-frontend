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

export interface ImageData {
    fileName: string;
    contentType: string;
    data: string; // Base64 encoded data
}

export interface ProductImages {
    name: string;
    images: ImageData[];
}

export interface ImageDatas {
    fileName: string;
    contentType: string;
    data: string; // Base64 encoded data
}

export interface Product{
    id: number,
    name: string;
    quantity: number;
    price: number[];
    description: string;
    images?: (File | ImageData)[];
    quantitysize?: number[];
    ratings?: number;
    ratingStar?: string;
    offerpercentage?: number;
    instock?: boolean;
    itemQty?:number;
}


export interface ProductDTO {
    name: string;
    price: number[];
    offerpercentage?: number;
    quantity: number;
    quantitysize: number[];
    instock: boolean;
    ratings: number;
    ratingStar: string;
    description: string;
    productImages?: ProductImages;
}

export interface ProductUpdateDTO {
    id: number;
    name: string;
    price: number[];
    offerpercentage?: number;
    quantity: number;
    quantitysize: number[];
    instock: boolean;
    ratings: number;
    ratingStar: string;
    description: string;
}


export interface ProductItems {
    products: Product[]
}
export interface ProductItemsNew {
    products: ProductFromSanity[]
}
export interface Image {
    asset: {
      _id: string;
      url: string;
    };
    caption: string;
  }

export interface ProductFromSanity{
    _id:string;
    name: string;
    quantity: number;
    price: number[];
    description: string;
    images?: Image[];
    quantitysize?: number[];
    ratings?: number;
    ratingStar?: number;
    offerpercentage?: number;
    instock?: boolean;
}