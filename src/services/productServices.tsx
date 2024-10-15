import { toast } from "react-toastify"
import { Product, ProductDTO, ProductUpdateDTO, ImageData } from "../types/productTypes"
import axios, { AxiosResponse } from "axios";
import { APIS, PRODUCT } from "../utils/constants";


export const productManagerAdd = async (product: Product, imageFiles: File[]): Promise<Product | undefined> => {
    const productdto: ProductDTO = {
        name: product.name,
        description: product.description,
        ratings: product.ratings!,
        ratingStar: product.ratingStar!,
        quantity: product.quantity,
        quantitysize: product.quantitysize!,
        price: product.price,
        offerpercentage: product.offerpercentage,
        instock: product.instock!,
    }
    const productDataBlob = new Blob([JSON.stringify(productdto)], {
        type: 'application/json',
    });

    const formData = new FormData();
    formData.append('data', productDataBlob); // Key must match backend's @RequestPart("data")

    // Append images to formData
    imageFiles.forEach((file) => {
        formData.append('images', file); // Key must match backend's @RequestPart("images")
    });
    try {
        const response: AxiosResponse<Product> = await axios.post(`${APIS.API}${APIS.CONTEXT}${PRODUCT.PRODUCT}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Product created successfully:', response.data);
        toast.success("Product added successfully");
        return response.data;
    } catch (error) {
        return undefined;
    }
}

export const productManagerGet: () => Promise<Product[] | undefined> = async () => {
    try {
        const response: AxiosResponse<Product[]> = await axios.get(`${APIS.API}${APIS.CONTEXT}${PRODUCT.PRODUCT}`);
        return response.data;

    } catch (error) {
        toast.error("Failed to get the product list")
        return [];
    }
}

export const productManagerUpdate = async (
    product: Product,
    imageFiles: File[],
    imageData: ImageData[] 
): Promise<Product | undefined> => {
    const productdto: ProductUpdateDTO = {
        id: product.id,
        name: product.name,
        description: product.description,
        ratings: product.ratings!,
        ratingStar: product.ratingStar!,
        quantity: product.quantity,
        quantitysize: product.quantitysize!,
        price: product.price,
        offerpercentage: product.offerpercentage,
        instock: product.instock!,
    };
    
    const productDataBlob = new Blob([JSON.stringify(productdto)], {
        type: 'application/json',
    });

    const formData = new FormData();
    formData.append('data', productDataBlob); // Key must match backend's @RequestPart("data")

    // Append new image files
    if (imageFiles && imageFiles.length > 0) {
        imageFiles.forEach((file) => {
            formData.append('images', file);
        });
    }

    // Append existing image data if any
    if (imageData && imageData.length > 0) {
        imageData.forEach((imgData) => {
            // If you need to convert ImageData to a File-like object for upload,
            // you might need to create a Blob for each ImageData object
            const byteCharacters = atob(imgData.data); // Decode base64
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const fileBlob = new Blob([byteArray], { type: imgData.contentType }); // Create a Blob
            const file = new File([fileBlob], imgData.fileName, { type: imgData.contentType }); // Create a File object
            
            formData.append('images', file); // Append to form data
        });
    }

    try {
        const response: AxiosResponse<Product> = await axios.put(
            `${APIS.API}${APIS.CONTEXT}${PRODUCT.PRODUCT}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        console.log('Product Updated successfully:', response.data);
        toast.success("Product Updated successfully");
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        toast.error('Failed to update the product');
        return undefined;
    }
};

export const productManagerDelete = async (product: Product) => {
    const productdto: ProductDTO = {
        name: product.name,
        description: product.description,
        ratings: product.ratings!,
        ratingStar: product.ratingStar!,
        quantity: product.quantity,
        quantitysize: product.quantitysize!,
        price: product.price,
        offerpercentage: product.offerpercentage,
        instock: product.instock!,
    }
    try {
        const response = await axios.delete(`${APIS.API}${APIS.CONTEXT}${PRODUCT.PRODUCT}`, {
            data: productdto
        });
        if (response.status === 200) {
            toast.success("Product deleted successfully");
            return true;
        }
    } catch (error) {
        toast.error("Failed to delete the Product")
        return false;
    }
}