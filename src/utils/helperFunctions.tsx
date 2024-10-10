import React from 'react'

import { Product } from '../types/productTypes';

export const sampleProduct: Product = {
    id: 1,
    name: "Ghee",
    quantity: 100,
    price: [100,200,300],
    description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    image: "path_to_image.png",
    offerpercentage: 100,
    quantitysize: [100, 250, 300],
    instock: true,
    ratings: 200,
    ratingStar: "3",
    itemQty: 1,
};

export const calculatePrice : any = (price : any, offerPercentage : any)   => {
    var ans = 1;
    var offerval = offerPercentage / 100;
    var priceval = Math.round(price * offerval);
    ans = price - priceval;

    return ans;

}


